"use client";

import { useEffect, useMemo, useState } from "react";
import { LESSONS, MODULES } from "../data/lessons";
import StepPlayer from "./StepPlayer";
import CodeBlock from "./CodeBlock";

const KEY = "akhis-lab-done-days";

export default function LearnTab() {
  const [done, setDone] = useState([]);
  const [selected, setSelected] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {}
  }, []);

  const toggleDone = (day) => {
    setDone((prev) => {
      const next = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LESSONS;
    return LESSONS.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.concept.toLowerCase().includes(q) ||
        l.hook.toLowerCase().includes(q)
    );
  }, [query]);

  const lesson = LESSONS[selected - 1];
  const pct = Math.round((done.length / LESSONS.length) * 100);

  return (
    <section>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>FDE Course · Module 1 — Software Engineering Foundation</h3>
        <p className="muted" style={{ margin: "4px 0 12px" }}>
          {done.length} / {LESSONS.length} days complete ({pct}%). Pick a day, step through the
          animation, read the concept, run the code, do the 15-minute assignment.
        </p>
        <div className="progressbar"><div style={{ width: `${pct}%` }} /></div>
        <div style={{ marginTop: 14 }}>
          <input
            type="search"
            placeholder="Search lessons — try “HTTP”, “SQL”, “queue”…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search lessons"
          />
        </div>
      </div>

      <div className="grid cols3" style={{ marginBottom: 18 }}>
        {filtered.map((l) => (
          <button
            key={l.day}
            className={`card lesson-card${l.day === selected ? " selected" : ""}${done.includes(l.day) ? " done" : ""}`}
            onClick={() => setSelected(l.day)}
          >
            <span className="day">Day {l.day} {done.includes(l.day) ? <span className="check">✓ done</span> : null}</span>
            <h3 style={{ fontSize: "1rem" }}>{l.title}</h3>
            <p className="muted small" style={{ margin: 0 }}>{l.hook}</p>
          </button>
        ))}
        {filtered.length === 0 && <p className="muted">No lessons match that search.</p>}
      </div>

      {lesson && (
        <article className="card">
          <span className="day" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Day {lesson.day} · Module 1
          </span>
          <h2 style={{ margin: "6px 0" }}>{lesson.title}</h2>
          <p className="muted" style={{ marginTop: 0 }}>{lesson.hook}</p>

          {lesson.nodes && lesson.steps ? (
            <StepPlayer key={lesson.day} nodes={lesson.nodes} steps={lesson.steps} />
          ) : null}

          <h3>The concept</h3>
          <p>{lesson.concept}</p>

          <h3>Example — run this</h3>
          <CodeBlock code={lesson.code} output={lesson.output} />

          <div className="callout warn">
            <strong>Common mistake:</strong> {lesson.mistake}
          </div>
          <div className="callout">
            <strong>The FDE angle:</strong> {lesson.fde}
          </div>

          <h3>Your 15-minute assignment</h3>
          <p>{lesson.assign}</p>

          <button
            className={`btn${done.includes(lesson.day) ? "" : " primary"}`}
            onClick={() => toggleDone(lesson.day)}
          >
            {done.includes(lesson.day) ? "✓ Completed — tap to undo" : "Mark Day " + lesson.day + " complete"}
          </button>
        </article>
      )}

      <div className="card">
        <h3 style={{ marginTop: 0 }}>The full 90-day map</h3>
        <p className="muted small">
          Every module of the FDE course on DevHacks-Akhi. Module 1 above is fully interactive;
          the rest unlock here as their lesson packs are written.
        </p>
        {MODULES.map((m) => (
          <div key={m.name} style={{ marginBottom: 12 }}>
            <strong>{m.name}</strong>{" "}
            <span className="muted small">{m.range}</span>
            <div className="chips">
              {m.items.map((t, i) => (
                <span className="chip" key={i}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
