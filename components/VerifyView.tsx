"use client";

import { useEffect, useState } from "react";
import { getProject } from "@/lib/curriculum";
import { useAuth } from "./AuthProvider";
import { verifyCertificate, type VerifiedCertificate } from "@/lib/sync";

type State =
  | { status: "idle" | "loading" | "notfound" }
  | { status: "found"; cert: VerifiedCertificate };

export default function VerifyView() {
  const { enabled } = useAuth();
  const [code, setCode] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });

  // Pre-fill from ?code= and auto-verify.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("code");
    if (c) {
      setCode(c);
      void run(c);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const run = async (value: string) => {
    if (!value.trim()) return;
    setState({ status: "loading" });
    const cert = await verifyCertificate(value.trim());
    setState(cert ? { status: "found", cert } : { status: "notfound" });
  };

  return (
    <div className="cert-page">
      <h1 style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
        🔎 Verify a certificate
      </h1>

      {!enabled && (
        <div className="quiz-result fail">
          Certificate verification isn’t configured for this site yet.
        </div>
      )}

      <div style={{ display: "flex", gap: 10, margin: "18px 0", flexWrap: "wrap" }}>
        <input
          className="name-input"
          placeholder="Enter code, e.g. DLP-1A2B3C4D"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run(code)}
        />
        <button className="btn primary" disabled={!enabled} onClick={() => run(code)}>
          Verify
        </button>
      </div>

      {state.status === "loading" && <p style={{ color: "var(--muted)" }}>Checking…</p>}

      {state.status === "notfound" && (
        <div className="quiz-result fail">
          No certificate matches <strong>{code}</strong>.
        </div>
      )}

      {state.status === "found" && (
        <div className="quiz-result pass">
          <p style={{ margin: 0 }}>
            ✅ Valid certificate.{" "}
            <strong>{state.cert.learner_name}</strong> completed{" "}
            <strong>
              {getProject(state.cert.project_id)?.name ?? state.cert.project_id}
            </strong>{" "}
            on {new Date(state.cert.issued_at).toLocaleDateString()}.
          </p>
        </div>
      )}
    </div>
  );
}
