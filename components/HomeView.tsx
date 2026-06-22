"use client";

import Link from "next/link";
import { curriculum } from "@/lib/curriculum";
import { isCertificateEarned, projectCompletedCount } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";

export default function HomeView() {
  const { map, ready } = useProgress();

  return (
    <div className="content">
      <div className="home-hero">
        <div className="big">🐳</div>
        <h1 style={{ border: "none", display: "inline-block" }}>
          DevOps Learning Path
        </h1>
        <p
          style={{
            color: "var(--muted)",
            maxWidth: 640,
            margin: "10px auto 0",
            lineHeight: 1.7,
          }}
        >
          {curriculum.subtitle}
        </p>
      </div>

      <div className="card-grid">
        {curriculum.projects.map((p) => {
          const completed = ready ? projectCompletedCount(map, p) : 0;
          const earned = ready && isCertificateEarned(map, p.id);
          return (
            <Link
              className="pcard"
              key={p.id}
              href={`/projects/${p.id}/${p.lessons[0].slug}`}
            >
              <h3>
                {p.emoji} Project {p.number} — {p.name}
              </h3>
              <p style={{ color: "var(--muted)", margin: ".4em 0 0", lineHeight: 1.6 }}>
                {p.overview}
              </p>
              <div className="meta">
                <span className="pill">{p.difficulty}</span>
                <span className="pill">Hosting: {p.hosting}</span>
                <span className="pill">
                  {completed}/{p.lessons.length} done
                </span>
                {earned && <span className="pill earned">🏆 Certified</span>}
              </div>
              <div style={{ fontSize: ".8rem", color: "var(--muted)" }}>
                {p.keySkills}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
