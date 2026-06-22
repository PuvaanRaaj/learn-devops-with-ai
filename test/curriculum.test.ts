import { describe, it, expect } from "vitest";
import {
  curriculum,
  flatLessons,
  getLesson,
  getProject,
  lessonKey,
  totalLessons,
} from "@/lib/curriculum";

describe("curriculum integrity", () => {
  it("has at least two projects", () => {
    expect(curriculum.projects.length).toBeGreaterThanOrEqual(2);
  });

  it("every lesson has a unique slug within its project", () => {
    for (const p of curriculum.projects) {
      const slugs = p.lessons.map((l) => l.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("every lesson slug matches its markdown filename", () => {
    for (const p of curriculum.projects) {
      for (const l of p.lessons) {
        expect(`${l.slug}.md`).toBe(l.file);
      }
    }
  });

  it("every lesson has an AI prompt and at least one quiz question", () => {
    for (const p of curriculum.projects) {
      for (const l of p.lessons) {
        expect(l.aiPrompt.length).toBeGreaterThan(10);
        expect(l.quiz.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("every quiz answer index points to a real option", () => {
    for (const p of curriculum.projects) {
      for (const l of p.lessons) {
        for (const q of l.quiz) {
          expect(q.options.length).toBeGreaterThanOrEqual(2);
          expect(q.answer).toBeGreaterThanOrEqual(0);
          expect(q.answer).toBeLessThan(q.options.length);
          expect(q.explanation.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("getProject / getLesson resolve known ids", () => {
    const p = curriculum.projects[0];
    expect(getProject(p.id)?.id).toBe(p.id);
    expect(getLesson(p.id, p.lessons[0].slug)?.slug).toBe(p.lessons[0].slug);
    expect(getProject("nope")).toBeUndefined();
    expect(getLesson(p.id, "nope")).toBeUndefined();
  });

  it("flatLessons covers every lesson and totalLessons agrees", () => {
    const flat = flatLessons();
    expect(flat.length).toBe(totalLessons());
    const keys = flat.map((f) => lessonKey(f.projectId, f.lesson.slug));
    expect(new Set(keys).size).toBe(keys.length);
  });
});
