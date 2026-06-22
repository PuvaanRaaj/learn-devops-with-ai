import { describe, it, expect } from "vitest";
import { curriculum, lessonKey } from "@/lib/curriculum";
import {
  isCertificateEarned,
  overallProgress,
  projectCompletedCount,
  setLessonProgress,
  type ProgressMap,
} from "@/lib/progress";

const project = curriculum.projects[0];

function completeAllRequired(): ProgressMap {
  let map: ProgressMap = {};
  for (const l of project.lessons) {
    if (!l.optional) {
      map = setLessonProgress(map, project.id, l.slug, { done: true });
    }
  }
  return map;
}

describe("progress selectors", () => {
  it("setLessonProgress is immutable and merges patches", () => {
    const a: ProgressMap = {};
    const b = setLessonProgress(a, project.id, project.lessons[0].slug, {
      quizScore: 0.5,
    });
    expect(a).toEqual({});
    const c = setLessonProgress(b, project.id, project.lessons[0].slug, {
      done: true,
    });
    const key = lessonKey(project.id, project.lessons[0].slug);
    expect(c[key]).toEqual({ quizScore: 0.5, done: true });
  });

  it("projectCompletedCount counts only done lessons", () => {
    let map: ProgressMap = {};
    expect(projectCompletedCount(map, project)).toBe(0);
    map = setLessonProgress(map, project.id, project.lessons[0].slug, {
      done: true,
    });
    expect(projectCompletedCount(map, project)).toBe(1);
  });

  it("certificate is not earned until all required lessons are done", () => {
    let map: ProgressMap = {};
    expect(isCertificateEarned(map, project.id)).toBe(false);

    // Completing only optional lessons must not earn the certificate.
    const optional = project.lessons.find((l) => l.optional);
    if (optional) {
      map = setLessonProgress(map, project.id, optional.slug, { done: true });
      expect(isCertificateEarned(map, project.id)).toBe(false);
    }

    map = completeAllRequired();
    expect(isCertificateEarned(map, project.id)).toBe(true);
  });

  it("missing one required lesson keeps the certificate locked", () => {
    const map = completeAllRequired();
    const firstRequired = project.lessons.find((l) => !l.optional)!;
    const partial = { ...map };
    delete partial[lessonKey(project.id, firstRequired.slug)];
    expect(isCertificateEarned(partial, project.id)).toBe(false);
  });

  it("certificate is false for an unknown project", () => {
    expect(isCertificateEarned({}, "does-not-exist")).toBe(false);
  });

  it("overallProgress computes ratio across all projects", () => {
    const empty = overallProgress({});
    expect(empty.done).toBe(0);
    expect(empty.ratio).toBe(0);

    const map = setLessonProgress({}, project.id, project.lessons[0].slug, {
      done: true,
    });
    const some = overallProgress(map);
    expect(some.done).toBe(1);
    expect(some.ratio).toBeCloseTo(1 / some.total);
  });
});
