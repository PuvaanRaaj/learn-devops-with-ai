"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { curriculum, lessonKey } from "@/lib/curriculum";
import { isCertificateEarned, overallProgress } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { map, ready } = useProgress();
  const { done, total, ratio } = overallProgress(map);

  return (
    <aside id="sidebar" className={open ? "open" : ""}>
      <div className="brand">
        <Link href="/">
          <h1>🐳 DevOps Learning Path</h1>
        </Link>
        <p>{curriculum.subtitle}</p>
        <span className="focus">{curriculum.focus}</span>
      </div>

      <div className="progress-wrap">
        <div className="progress-label">
          <span>Your progress</span>
          <span>
            {ready ? done : 0} / {total}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: ready ? `${ratio * 100}%` : "0%" }}
          />
        </div>
      </div>

      <nav className="lessons">
        <Link
          href="/"
          className={`lesson ${pathname === "/" ? "active" : ""}`}
          onClick={onClose}
        >
          <span className="step">⌂</span>
          <span>Home / Overview</span>
        </Link>

        {curriculum.projects.map((p) => {
          const earned = ready && isCertificateEarned(map, p.id);
          return (
            <div key={p.id}>
              <div className="proj-title">
                Project {p.number}: {p.name}
              </div>
              {p.lessons.map((l) => {
                const href = `/projects/${p.id}/${l.slug}`;
                const isDone = !!map[lessonKey(p.id, l.slug)]?.done;
                const active = pathname === href || pathname === `${href}/`;
                return (
                  <Link
                    key={l.slug}
                    href={href}
                    onClick={onClose}
                    className={`lesson ${active ? "active" : ""} ${
                      ready && isDone ? "done" : ""
                    }`}
                  >
                    <span className="step">{l.step}</span>
                    <span>
                      {l.title}{" "}
                      {l.optional && <span className="opt-tag">opt</span>}
                    </span>
                    <span className="tick">✓</span>
                  </Link>
                );
              })}
              <Link
                href={`/certificate/${p.id}`}
                onClick={onClose}
                className={`cert-link ${earned ? "" : "locked"}`}
              >
                {earned ? "🏆 View certificate" : "🔒 Certificate (locked)"}
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
