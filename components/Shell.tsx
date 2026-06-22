"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { getLesson, getProject } from "@/lib/curriculum";
import { ProgressProvider } from "./ProgressProvider";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

const GH_REPO = "https://github.com/PuvaanRaaj/learn-devops-with-ai";

function useCrumb(): string {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "Home";
  if (parts[0] === "projects") {
    const project = getProject(parts[1]);
    if (!project) return "Home";
    if (parts[2]) {
      const lesson = getLesson(project.id, parts[2]);
      return lesson
        ? `Project ${project.number} › ${lesson.step} ${lesson.title}`
        : `Project ${project.number}`;
    }
    return `Project ${project.number} — ${project.name}`;
  }
  if (parts[0] === "certificate") {
    const project = getProject(parts[1]);
    return project ? `Certificate — ${project.name}` : "Certificate";
  }
  return "Home";
}

export default function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const crumb = useCrumb();

  return (
    <ProgressProvider>
      <div className="app">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div
          id="backdrop"
          className={open ? "show" : ""}
          onClick={() => setOpen(false)}
        />
        <main id="main">
          <div className="topbar">
            <button
              className="icon-btn"
              id="menu-toggle"
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
            >
              ☰
            </button>
            <span className="crumb">{crumb}</span>
            <ThemeToggle />
            <a className="btn" href={GH_REPO} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </div>
          {children}
        </main>
      </div>
    </ProgressProvider>
  );
}
