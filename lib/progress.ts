// Client-side progress, quiz state, and certificate eligibility.
// Everything is stored in localStorage — no backend, no login.

import { curriculum, getProject, lessonKey, type Project } from "./curriculum";

export const STORE_KEY = "devops-path-progress-v2";
export const NAME_KEY = "devops-path-learner-name";

export interface LessonProgress {
  /** True once the learner passed the lesson quiz at 100%. */
  done?: boolean;
  /** Best quiz score recorded, 0..1. */
  quizScore?: number;
  /** "Done when" checkbox state, keyed by index. */
  tasks?: Record<number, boolean>;
}

export type ProgressMap = Record<string, LessonProgress>;

function isBrowser(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function loadProgress(): ProgressMap {
  if (!isBrowser()) return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveProgress(map: ProgressMap): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORE_KEY, JSON.stringify(map));
}

export function getLessonProgress(
  map: ProgressMap,
  projectId: string,
  slug: string,
): LessonProgress {
  return map[lessonKey(projectId, slug)] || {};
}

export function setLessonProgress(
  map: ProgressMap,
  projectId: string,
  slug: string,
  patch: Partial<LessonProgress>,
): ProgressMap {
  const key = lessonKey(projectId, slug);
  const next = { ...map, [key]: { ...map[key], ...patch } };
  return next;
}

// ---- Pure selectors (unit tested) ----

/** Count of completed lessons in a project. */
export function projectCompletedCount(map: ProgressMap, project: Project): number {
  return project.lessons.filter(
    (l) => map[lessonKey(project.id, l.slug)]?.done,
  ).length;
}

/**
 * A certificate is earned when every *required* (non-optional) lesson in the
 * project has been completed by passing its quiz at 100%.
 */
export function isCertificateEarned(map: ProgressMap, projectId: string): boolean {
  const project = getProject(projectId);
  if (!project) return false;
  const required = project.lessons.filter((l) => !l.optional);
  if (required.length === 0) return false;
  return required.every((l) => map[lessonKey(projectId, l.slug)]?.done);
}

/** Overall completion across the whole curriculum, 0..1. */
export function overallProgress(map: ProgressMap): {
  done: number;
  total: number;
  ratio: number;
} {
  let done = 0;
  let total = 0;
  for (const p of curriculum.projects) {
    for (const l of p.lessons) {
      total += 1;
      if (map[lessonKey(p.id, l.slug)]?.done) done += 1;
    }
  }
  return { done, total, ratio: total ? done / total : 0 };
}

/**
 * Merge two progress maps (e.g. guest localStorage into a freshly signed-in
 * account). A lesson is done if it's done in either; the higher quiz score
 * wins; task checkboxes are unioned. Pure + order-independent.
 */
export function mergeProgress(a: ProgressMap, b: ProgressMap): ProgressMap {
  const out: ProgressMap = {};
  for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
    const x = a[key] || {};
    const y = b[key] || {};
    out[key] = {
      done: !!(x.done || y.done),
      quizScore: Math.max(x.quizScore ?? 0, y.quizScore ?? 0),
      tasks: { ...x.tasks, ...y.tasks },
    };
  }
  return out;
}

export function loadName(): string {
  if (!isBrowser()) return "";
  return window.localStorage.getItem(NAME_KEY) || "";
}

export function saveName(name: string): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(NAME_KEY, name);
}
