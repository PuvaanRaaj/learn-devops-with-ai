"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { Lesson } from "@/lib/curriculum";
import { getLessonProgress, setLessonProgress } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";
import AiPrompt from "./AiPrompt";
import Quiz from "./Quiz";

interface NavLink {
  href: string;
  label: string;
}

export default function LessonView({
  projectId,
  lesson,
  prev,
  next,
  children,
}: {
  projectId: string;
  lesson: Lesson;
  prev: NavLink | null;
  next: NavLink | null;
  children: ReactNode;
}) {
  const { map, update, ready } = useProgress();
  const progress = getLessonProgress(map, projectId, lesson.slug);
  const done = !!progress.done;

  const handlePass = (score: number) => {
    update((prev) =>
      setLessonProgress(prev, projectId, lesson.slug, {
        done: true,
        quizScore: Math.max(score, prev[`${projectId}/${lesson.slug}`]?.quizScore ?? 0),
      }),
    );
  };

  return (
    <article className="content">
      <AiPrompt prompt={lesson.aiPrompt} />

      {children}

      <Quiz questions={lesson.quiz} passed={ready && done} onPass={handlePass} />

      <div className="lesson-foot">
        {prev ? (
          <Link className="btn" href={prev.href}>
            ← {prev.label}
          </Link>
        ) : (
          <span className="btn" aria-disabled style={{ opacity: 0.4 }}>
            ← Previous
          </span>
        )}

        <span className={`status-pill ${ready && done ? "done" : ""}`}>
          {ready && done ? "✓ Completed" : "Pass the quiz to complete"}
        </span>

        {next ? (
          <Link className="btn primary" href={next.href}>
            {next.label} →
          </Link>
        ) : (
          <span className="btn" aria-disabled style={{ opacity: 0.4 }}>
            Next →
          </span>
        )}
      </div>
    </article>
  );
}
