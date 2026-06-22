import { notFound } from "next/navigation";
import { curriculum, getProject } from "@/lib/curriculum";
import Certificate from "@/components/Certificate";

export function generateStaticParams() {
  return curriculum.projects.map((p) => ({ project: p.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  if (!getProject(project)) notFound();
  return <Certificate projectId={project} />;
}
