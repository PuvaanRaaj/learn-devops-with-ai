"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";

export default function AuthMenu() {
  const { enabled, user, loading, signInWithEmail, signInWithProvider, signOut } =
    useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Hide entirely until Supabase is configured — keeps the guest UI clean.
  if (!enabled) return null;
  if (loading) return null;

  if (user) {
    const label = user.email ?? user.user_metadata?.name ?? "Account";
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="status-pill" title={label} style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {label}
        </span>
        <button className="btn" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  const sendLink = async () => {
    setBusy(true);
    setError(null);
    const { error } = await signInWithEmail(email.trim());
    setBusy(false);
    if (error) setError(error);
    else setSent(true);
  };

  // Social logins are built but hidden for now — flip to true to re-enable.
  const SHOW_SOCIAL = false;

  return (
    <>
      <button className="btn primary" onClick={() => setOpenModal(true)}>
        Sign in
      </button>

      {openModal && (
        <div className="modal-backdrop" onClick={() => setOpenModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <strong>Sign in to save your progress</strong>
              <button className="icon-btn" onClick={() => setOpenModal(false)} aria-label="Close">
                ✕
              </button>
            </div>
            <p style={{ color: "var(--muted)", fontSize: ".85rem", marginTop: 0 }}>
              Sync lessons across devices and earn verifiable certificates.
            </p>

            {SHOW_SOCIAL && (
              <>
                <div className="oauth-row">
                  <button className="btn" onClick={() => signInWithProvider("google")}>
                    Continue with Google
                  </button>
                  <button className="btn" onClick={() => signInWithProvider("github")}>
                    Continue with GitHub
                  </button>
                </div>
                <div className="modal-divider">
                  <span>or email magic link</span>
                </div>
              </>
            )}

            {sent ? (
              <p className="quiz-result pass" style={{ marginTop: 0 }}>
                ✉️ Check your inbox — we sent a sign-in link to{" "}
                <strong>{email}</strong>.
              </p>
            ) : (
              <>
                <input
                  className="name-input"
                  style={{ width: "100%" }}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && (
                  <p style={{ color: "var(--red)", fontSize: ".82rem" }}>{error}</p>
                )}
                <button
                  className="btn primary"
                  style={{ width: "100%", marginTop: 10, justifyContent: "center" }}
                  disabled={busy || !email.includes("@")}
                  onClick={sendLink}
                >
                  {busy ? "Sending…" : "Send magic link"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
