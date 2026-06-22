"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  loadName,
  loadProgress,
  mergeProgress,
  saveProgress,
  type ProgressMap,
} from "@/lib/progress";
import {
  fetchRemoteProgress,
  saveRemoteProgress,
  syncCertificates,
} from "@/lib/sync";
import { useAuth } from "./AuthProvider";

interface ProgressContextValue {
  map: ProgressMap;
  /** Apply a pure update and persist it (locally, and remotely when signed in). */
  update: (fn: (prev: ProgressMap) => ProgressMap) => void;
  /** False until storage has been read (avoids hydration mismatch). */
  ready: boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [map, setMap] = useState<ProgressMap>({});
  const [ready, setReady] = useState(false);
  const userIdRef = useRef<string | null>(null);

  // Initial load from localStorage (guest baseline).
  useEffect(() => {
    setMap(loadProgress());
    setReady(true);
  }, []);

  // When a user signs in, pull their cloud progress and merge guest progress in.
  useEffect(() => {
    const uid = user?.id ?? null;
    if (uid === userIdRef.current) return;
    userIdRef.current = uid;
    if (!uid) return; // signed out — keep working from local storage

    (async () => {
      const remote = (await fetchRemoteProgress(uid)) ?? {};
      setMap((local) => {
        const merged = mergeProgress(local, remote);
        saveProgress(merged);
        void saveRemoteProgress(uid, merged);
        void syncCertificates(uid, loadName(), merged);
        return merged;
      });
    })();
  }, [user]);

  const update = useCallback((fn: (prev: ProgressMap) => ProgressMap) => {
    setMap((prev) => {
      const next = fn(prev);
      saveProgress(next);
      const uid = userIdRef.current;
      if (uid) {
        void saveRemoteProgress(uid, next);
        void syncCertificates(uid, loadName(), next);
      }
      return next;
    });
  }, []);

  return (
    <ProgressContext.Provider value={{ map, update, ready }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
