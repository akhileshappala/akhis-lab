"use client";

import { useState } from "react";
import LearnTab from "../components/LearnTab";
import SystemDesignTab from "../components/SystemDesignTab";
import InterviewTab from "../components/InterviewTab";
import ProjectsTab from "../components/ProjectsTab";
import AboutTab from "../components/AboutTab";

const TABS = ["Learn", "System Design", "Interview Prep", "Projects", "About"];

export default function Home() {
  const [tab, setTab] = useState("Learn");

  return (
    <div className="wrap">
      <header className="site">
        <h1>Akhi&apos;s <span className="accent">Lab</span></h1>
        <p>
          One place to learn many things: the Forward Deployed Engineer course, system design
          concepts, interview prep, and the projects that prove it. One concept, one example,
          one assignment — every day.
        </p>
      </header>

      <nav className="tabs" aria-label="Sections">
        {TABS.map((t) => (
          <button
            key={t}
            className={`tab-btn${tab === t ? " active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </nav>

      <main>
        {tab === "Learn" && <LearnTab />}
        {tab === "System Design" && <SystemDesignTab />}
        {tab === "Interview Prep" && <InterviewTab />}
        {tab === "Projects" && <ProjectsTab />}
        {tab === "About" && <AboutTab />}
      </main>

      <footer className="site">
        Akhi&apos;s Lab — built from the DevHacks-Akhi FDE Course Bible and Lesson Packs
        (Days 1–15) and the 27-concept system design checklist. By Akhilesh Appala ·{" "}
        <a href="https://github.com/akhileshappala" target="_blank" rel="noreferrer">GitHub</a> ·{" "}
        <a href="https://www.youtube.com/@DevHacks-Akhi" target="_blank" rel="noreferrer">DevHacks-Akhi</a> ·{" "}
        <a href="https://www.youtube.com/@ssakhilesh59" target="_blank" rel="noreferrer">SSAkhi</a>
      </footer>
    </div>
  );
}
