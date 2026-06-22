"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { getLesson, getProject } from "@/lib/curriculum";
import { AuthProvider } from "./AuthProvider";
import AuthMenu from "./AuthMenu";
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

const COLLAPSE_KEY = "devops-sidebar-collapsed";

export default function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false); // mobile drawer
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const crumb = useCrumb();

  useEffect(() => {
    setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "1");
  }, []);

  // On desktop the button collapses/expands the rail; on mobile it opens the drawer.
  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 820px)").matches) {
      setOpen((o) => !o);
    } else {
      setCollapsed((c) => {
        const next = !c;
        localStorage.setItem(COLLAPSE_KEY, next ? "1" : "");
        return next;
      });
    }
  };

  return (
    <AuthProvider>
      <ProgressProvider>
      <div className={`app ${collapsed ? "collapsed" : ""}`}>
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
              aria-label={collapsed ? "Show sidebar" : "Hide sidebar"}
              title={collapsed ? "Show sidebar" : "Hide sidebar"}
              onClick={toggleSidebar}
            >
              ☰
            </button>
            <span className="crumb">{crumb}</span>
            <AuthMenu />
            <ThemeToggle />
            <a className="btn" href={GH_REPO} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </div>
          {children}
        </main>
      </div>
      </ProgressProvider>
    </AuthProvider>
  );
}
