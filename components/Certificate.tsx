"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProject } from "@/lib/curriculum";
import {
  isCertificateEarned,
  loadName,
  saveName,
} from "@/lib/progress";
import { certificateCode, syncCertificates } from "@/lib/sync";
import { useProgress } from "./ProgressProvider";
import { useAuth } from "./AuthProvider";

/** Deterministic short verification code from name + project + date. */
function certCode(name: string, projectId: string): string {
  const seed = `${name}|${projectId}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36).toUpperCase().padStart(7, "0").slice(0, 7);
}

export default function Certificate({ projectId }: { projectId: string }) {
  const project = getProject(projectId);
  const { map, ready } = useProgress();
  const { user } = useAuth();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(loadName());
  }, []);

  if (!project) return <div className="content">Project not found.</div>;

  const earned = ready && isCertificateEarned(map, projectId);
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!ready) {
    return <div className="cert-page">Loading…</div>;
  }

  if (!earned) {
    return (
      <div className="cert-page">
        <div className="locked-box">
          <div style={{ fontSize: "2.4rem" }}>🔒</div>
          <h2>Certificate locked</h2>
          <p>
            Complete every required lesson in{" "}
            <strong>
              Project {project.number} — {project.name}
            </strong>{" "}
            by passing each lesson quiz at 100% to unlock your certificate.
          </p>
          <Link className="btn primary" href={`/projects/${project.id}/${project.lessons[0].slug}`}>
            Go to lessons →
          </Link>
        </div>
      </div>
    );
  }

  const displayName = name.trim() || "Your Name";
  // Logged-in certificates use an account-bound code that the public /verify
  // page can look up. Guests get a local, non-verifiable code.
  const code = user ? certificateCode(user.id, projectId) : certCode(displayName, projectId);
  const verifyUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify?code=${code}`
      : `/verify?code=${code}`;

  return (
    <div className="cert-page">
      <div className="cert-controls" style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          className="name-input"
          placeholder="Enter your name for the certificate"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            saveName(e.target.value);
          }}
          onBlur={(e) => {
            // Persist the chosen name onto the stored certificate.
            if (user) void syncCertificates(user.id, e.target.value.trim(), map);
          }}
        />
        <button className="btn primary" onClick={() => window.print()}>
          🖨️ Print / Save as PDF
        </button>
      </div>

      <div className="cert">
        <div className="seal">🏆</div>
        <h1>Certificate of Completion</h1>
        <p className="awarded">This certifies that</p>
        <div className="learner">{displayName}</div>
        <p className="for">
          has successfully completed all required lessons and quizzes for
          <br />
          <strong>
            {project.emoji} Project {project.number} — {project.name}
          </strong>
          <br />
          <span style={{ color: "var(--muted)", fontSize: ".9rem" }}>
            {project.keySkills}
          </span>
        </p>
        <div className="cert-meta">
          <span>Issued: {today}</span>
          <span>DevOps Learning Path</span>
          <span>Verification: {code}</span>
        </div>
      </div>

      {user ? (
        <p style={{ color: "var(--muted)", fontSize: ".82rem", marginTop: 14 }}>
          Anyone can verify this certificate at{" "}
          <a href={verifyUrl}>{verifyUrl}</a>
        </p>
      ) : (
        <p style={{ color: "var(--muted)", fontSize: ".82rem", marginTop: 14 }}>
          💡 Sign in to get a <strong>verifiable</strong> certificate others can
          confirm online, synced across your devices.
        </p>
      )}
    </div>
  );
}
