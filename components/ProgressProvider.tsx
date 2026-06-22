"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { loadProgress, saveProgress, type ProgressMap } from "@/lib/progress";

interface ProgressContextValue {
  map: ProgressMap;
  /** Apply a pure update and persist it. */
  update: (fn: (prev: ProgressMap) => ProgressMap) => void;
  /** False until localStorage has been read (avoids hydration mismatch). */
  ready: boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<ProgressMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMap(loadProgress());
    setReady(true);
  }, []);

  const update = useCallback((fn: (prev: ProgressMap) => ProgressMap) => {
    setMap((prev) => {
      const next = fn(prev);
      saveProgress(next);
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
