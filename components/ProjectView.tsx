"use client";

import Link from "next/link";
import { getProject, lessonKey } from "@/lib/curriculum";
import { isCertificateEarned, projectCompletedCount } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";

export default function ProjectView({ projectId }: { projectId: string }) {
  const project = getProject(projectId);
  const { map, ready } = useProgress();

  if (!project) return <div className="content">Project not found.</div>;

  const completed = ready ? projectCompletedCount(map, project) : 0;
  const earned = ready && isCertificateEarned(map, project.id);

  return (
    <div className="content">
      <h1>
        {project.emoji} Project {project.number} — {project.name}
      </h1>
      <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>{project.overview}</p>

      <div className="meta" style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0" }}>
        <span className="pill">{project.difficulty}</span>
        <span className="pill">Hosting: {project.hosting}</span>
        <span className="pill">
          {completed}/{project.lessons.length} done
        </span>
        <span className={`pill ${earned ? "earned" : ""}`}>
          {earned ? "🏆 Certified" : "🔒 Certificate locked"}
        </span>
      </div>

      <p>
        <strong>Stretch goal:</strong> {project.stretchGoal}
      </p>

      <h2>Lessons</h2>
      <nav className="lessons" style={{ padding: 0 }}>
        {project.lessons.map((l) => {
          const href = `/projects/${project.id}/${l.slug}`;
          const isDone = ready && !!map[lessonKey(project.id, l.slug)]?.done;
          return (
            <Link key={l.slug} href={href} className={`lesson ${isDone ? "done" : ""}`}>
              <span className="step">{l.step}</span>
              <span>
                {l.title} {l.optional && <span className="opt-tag">opt</span>}
              </span>
              <span className="tick">✓</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: 24 }}>
        <Link
          href={`/certificate/${project.id}`}
          className="btn"
          style={earned ? { borderColor: "var(--gold)", color: "var(--gold)" } : {}}
        >
          {earned ? "🏆 View your certificate" : "🔒 Certificate (complete all required lessons)"}
        </Link>
      </div>
    </div>
  );
}
