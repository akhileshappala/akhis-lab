"use client";

import { useState } from "react";
import CourseShell from "../components/CourseShell";
import InterviewTab from "../components/InterviewTab";
import ProjectsTab from "../components/ProjectsTab";
import AboutTab from "../components/AboutTab";

const NAV = [
  { id: "courses", label: "Courses" },
  { id: "interview", label: "Interview Prep" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
];

export default function Home() {
  const [view, setView] = useState("courses");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <header className="topbar">
        <div className="topbar-inner">
          <button
            className="brand"
            onClick={() => { setView("courses"); setDrawerOpen(false); }}
            aria-label="Akhi's Lab — home"
          >
            Akhi&apos;s <span className="accent">Lab</span>
          </button>

          {view === "courses" && (
            <button
              className="btn drawer-toggle"
              onClick={() => setDrawerOpen((o) => !o)}
              aria-expanded={drawerOpen}
            >
              Lessons
            </button>
          )}

          <nav className="topnav" aria-label="Sections">
            {NAV.map((n) => (
              <button
                key={n.id}
                className={`tnav${view === n.id ? " active" : ""}`}
                onClick={() => { setView(n.id); setDrawerOpen(false); }}
              >
                {n.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {view === "courses" && (
          <CourseShell drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        )}
        {view !== "courses" && (
          <div className="wrap">
            {view === "interview" && (
              <>
                <p className="eyebrow">Akhi&apos;s Lab</p>
                <h1 className="page-title">Interview Prep</h1>
                <InterviewTab />
              </>
            )}
            {view === "projects" && (
              <>
                <p className="eyebrow">Akhi&apos;s Lab</p>
                <h1 className="page-title">Projects</h1>
                <ProjectsTab />
              </>
            )}
            {view === "about" && (
              <>
                <p className="eyebrow">Akhi&apos;s Lab</p>
                <h1 className="page-title">About</h1>
                <AboutTab />
              </>
            )}
            <footer className="site">
              Akhi&apos;s Lab — built from the DevHacks-Akhi FDE Course Bible and Lesson Packs
              (Days 1–15) and the 27-concept system design checklist. By Akhilesh Appala ·{" "}
              <a href="https://github.com/akhileshappala" target="_blank" rel="noreferrer">GitHub</a> ·{" "}
              <a href="https://www.youtube.com/@DevHacks-Akhi" target="_blank" rel="noreferrer">DevHacks-Akhi</a> ·{" "}
              <a href="https://www.youtube.com/@ssakhilesh59" target="_blank" rel="noreferrer">SSAkhi</a>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}
