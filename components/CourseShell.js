"use client";

import { useEffect, useMemo, useState } from "react";
import { LESSONS, MODULES } from "../data/lessons";
import { SD_LESSONS, SD_ROADMAP } from "../data/sdCourse";
import LessonView from "./LessonView";
import SdExtras from "./SdExtras";

const FDE_KEY = "akhis-lab-done-days";
const SD_KEY = "akhis-lab-done-sd-lessons";
const TOTAL = LESSONS.length + SD_LESSONS.length;

function loadDone(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveDone(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export default function CourseShell({ drawerOpen, setDrawerOpen }) {
  const [fdeDone, setFdeDone] = useState([]);
  const [sdDone, setSdDone] = useState([]);
  const [sel, setSel] = useState({ course: "fde", id: 1 }); // id = day (fde) or number (sd)
  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState({}); // roadmap groups, keyed by name

  useEffect(() => {
    setFdeDone(loadDone(FDE_KEY));
    setSdDone(loadDone(SD_KEY));
  }, []);

  const toggleFde = (day) => {
    setFdeDone((prev) => {
      const next = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day];
      saveDone(FDE_KEY, next);
      return next;
    });
  };

  const toggleSd = (number) => {
    setSdDone((prev) => {
      const next = prev.includes(number) ? prev.filter((d) => d !== number) : [...prev, number];
      saveDone(SD_KEY, next);
      return next;
    });
  };

  const pick = (course, id) => {
    setSel({ course, id });
    setDrawerOpen(false);
  };

  const matches = (text) => text.toLowerCase().includes(query.trim().toLowerCase());
  const searching = query.trim().length > 0;

  const fdeList = useMemo(() => {
    if (!searching) return LESSONS;
    return LESSONS.filter((l) => matches(l.title) || matches(l.concept) || matches(l.hook));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const sdList = useMemo(() => {
    if (!searching) return SD_LESSONS;
    return SD_LESSONS.filter(
      (l) => matches(l.title) || matches(l.concept) || matches(l.hook) || l.concepts.some(matches)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const doneCount = fdeDone.length + sdDone.length;
  const pct = Math.round((doneCount / TOTAL) * 100);

  const lesson =
    sel.course === "fde"
      ? LESSONS.find((l) => l.day === sel.id) || LESSONS[0]
      : SD_LESSONS.find((l) => l.number === sel.id) || SD_LESSONS[0];

  const toggleGroup = (name) =>
    setOpenGroups((g) => ({ ...g, [name]: !g[name] }));

  const roadmapGroup = (name, meta, items) => {
    const open = searching ? true : !!openGroups[name];
    return (
      <div className="side-group roadmap" key={name}>
        <button
          className="side-group-head"
          onClick={() => toggleGroup(name)}
          aria-expanded={open}
        >
          <span>{name}</span>
          <span className="side-group-meta">{meta} · {open ? "−" : "+"}</span>
        </button>
        {open && (
          <ul className="side-roadmap">
            {items.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="shell">
      {drawerOpen && <div className="scrim" onClick={() => setDrawerOpen(false)} />}

      <aside className={`sidebar${drawerOpen ? " open" : ""}`} aria-label="Course lessons">
        <div className="side-search">
          <input
            type="search"
            placeholder="Search lessons in both courses…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search lessons"
          />
        </div>

        <div className="side-progress">
          <div className="side-progress-label">
            <span>Your progress</span>
            <span>{doneCount} / {TOTAL} lessons</span>
          </div>
          <div className="progressbar thin"><div style={{ width: `${pct}%` }} /></div>
        </div>

        <p className="side-course">FDE Course</p>
        <div className="side-group">
          <p className="side-group-title">Module 1 — Software Engineering Foundation</p>
          {fdeList.map((l) => (
            <button
              key={l.day}
              className={`side-row${sel.course === "fde" && sel.id === l.day ? " active" : ""}`}
              onClick={() => pick("fde", l.day)}
            >
              <span className="side-num">{l.day}</span>
              <span className="side-row-title">{l.title}</span>
              {fdeDone.includes(l.day) && <span className="side-check" aria-label="Completed">✓</span>}
            </button>
          ))}
          {searching && fdeList.length === 0 && <p className="side-empty">No FDE lessons match.</p>}
        </div>
        {!searching && MODULES.map((m) => roadmapGroup(m.name, m.range, m.items))}

        <p className="side-course">System Design</p>
        <div className="side-group">
          <p className="side-group-title">Module 1 — Foundations of Scale</p>
          {sdList.map((l) => (
            <button
              key={l.id}
              className={`side-row${sel.course === "sd" && sel.id === l.number ? " active" : ""}`}
              onClick={() => pick("sd", l.number)}
            >
              <span className="side-num">{l.number}</span>
              <span className="side-row-title">{l.title}</span>
              {sdDone.includes(l.number) && <span className="side-check" aria-label="Completed">✓</span>}
            </button>
          ))}
          {searching && sdList.length === 0 && <p className="side-empty">No system design lessons match.</p>}
        </div>
        {!searching && SD_ROADMAP.slice(1).map((m) => roadmapGroup(m.name, "Roadmap", m.lessons))}
      </aside>

      <div className="lesson-main">
        {sel.course === "fde" ? (
          <LessonView
            kind="fde"
            lesson={lesson}
            done={fdeDone.includes(lesson.day)}
            onToggleDone={() => toggleFde(lesson.day)}
          />
        ) : (
          <>
            <LessonView
              kind="sd"
              lesson={lesson}
              done={sdDone.includes(lesson.number)}
              onToggleDone={() => toggleSd(lesson.number)}
            />
            <SdExtras />
          </>
        )}
      </div>
    </div>
  );
}
