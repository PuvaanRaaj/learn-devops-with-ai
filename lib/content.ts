import { promises as fs } from "fs";
import path from "path";

// Server-only helper: read a lesson's markdown body at build time so the
// static export bundles the rendered HTML. Never imported by client code.

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function readLessonMarkdown(
  projectId: string,
  file: string,
): Promise<string> {
  const filePath = path.join(CONTENT_DIR, projectId, file);
  return fs.readFile(filePath, "utf8");
}
