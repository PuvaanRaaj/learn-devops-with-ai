import { notFound } from "next/navigation";
import {
  curriculum,
  flatLessons,
  getLesson,
  lessonKey,
} from "@/lib/curriculum";
import { readLessonMarkdown } from "@/lib/content";
import LessonView from "@/components/LessonView";
import MarkdownArticle from "@/components/MarkdownArticle";

export function generateStaticParams() {
  const params: { project: string; lesson: string }[] = [];
  for (const p of curriculum.projects) {
    for (const l of p.lessons) {
      params.push({ project: p.id, lesson: l.slug });
    }
  }
  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ project: string; lesson: string }>;
}) {
  const { project, lesson } = await params;
  const meta = getLesson(project, lesson);
  if (!meta) notFound();

  const markdown = await readLessonMarkdown(project, meta.file);

  // Compute previous / next across the whole curriculum.
  const flat = flatLessons();
  const idx = flat.findIndex((f) => lessonKey(f.projectId, f.lesson.slug) === lessonKey(project, lesson));
  const prevItem = idx > 0 ? flat[idx - 1] : null;
  const nextItem = idx < flat.length - 1 ? flat[idx + 1] : null;

  const prev = prevItem
    ? {
        href: `/projects/${prevItem.projectId}/${prevItem.lesson.slug}`,
        label: "Previous",
      }
    : null;
  const next = nextItem
    ? {
        href: `/projects/${nextItem.projectId}/${nextItem.lesson.slug}`,
        label: "Next",
      }
    : null;

  return (
    <LessonView projectId={project} lesson={meta} prev={prev} next={next}>
      <MarkdownArticle markdown={markdown} />
    </LessonView>
  );
}
