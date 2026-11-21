"use client";

import { useEffect, useState } from "react";
import { SD_GROUPS, SD_PLAYER } from "../data/systemDesign";
import { SD_LESSONS, SD_ROADMAP } from "../data/sdCourse";
import StepPlayer from "./StepPlayer";

const KEY = "akhis-lab-done-sd-lessons";

const REMIXES = [
  {
    title: "Design Instagram",
    body: "A feed is reads at massive scale: precompute timelines, serve media from the edge, and never let a celebrity post melt the database.",
    chips: ["Caching", "CDN", "Queues"],
  },
  {
    title: "Design a URL shortener",
    body: "Reads dwarf writes (~400 reads/sec vs ~40 writes/sec), so the whole design is: generate a short key, index it, replicate it, cache it.",
    chips: ["APIs", "Indexing", "Replication", "Caching"],
  },
  {
    title: "Design Uber",
    body: "Matching riders and drivers is a latency game: nearest-driver lookups in milliseconds, load spread across regions, everything monitored live.",
    chips: ["Load balancing", "Latency", "Monitoring"],
  },
];

export default function SystemDesignTab() {
  const [open, setOpen] = useState(null); // "groupIdx-itemIdx"
  const [done, setDone] = useState([]);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {}
  }, []);

  const toggleDone = (number) => {
    setDone((prev) => {
      const next = prev.includes(number) ? prev.filter((d) => d !== number) : [...prev, number];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const sdLesson = SD_LESSONS[selected - 1];
  const sdPct = Math.round((done.length / SD_LESSONS.length) * 100);

  return (
    <section>
      {/* ---------- System Design Course (Module 1 live, 40-lesson roadmap) ---------- */}
      <div className="card">
        <h3 style={{ marginTop: 0 }}>System Design Course · Module 1 — Foundations of Scale</h3>
        <p className="muted" style={{ margin: "4px 0 12px" }}>
          {done.length} / {SD_LESSONS.length} Module 1 lessons complete ({sdPct}%). Forty animated
          lessons in total — Module 1 is playable now; the rest are on the roadmap below and land
          one module at a time. Pick a lesson, step through the animation, read the trade-off,
          say the interview line out loud.
        </p>
        <div className="progressbar"><div style={{ width: `${sdPct}%` }} /></div>
      </div>

      <div className="grid cols3" style={{ marginBottom: 18 }}>
        {SD_LESSONS.map((l) => (
          <button
            key={l.id}
            className={`card lesson-card${l.number === selected ? " selected" : ""}${done.includes(l.number) ? " done" : ""}`}
            onClick={() => setSelected(l.number)}
          >
            <span className="day">Lesson {l.number} {done.includes(l.number) ? <span className="check">✓ done</span> : null}</span>
            <h3 style={{ fontSize: "1rem" }}>{l.title}</h3>
            <p className="muted small" style={{ margin: 0 }}>{l.hook}</p>
            <div className="chips">
              {l.concepts.map((c) => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {sdLesson && (
        <article className="card">
          <span className="day" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Lesson {sdLesson.number} · Module 1 — Foundations of Scale
          </span>
          <h2 style={{ margin: "6px 0" }}>{sdLesson.title}</h2>
          <p className="muted" style={{ marginTop: 0 }}>{sdLesson.hook}</p>

          <StepPlayer key={sdLesson.id} nodes={sdLesson.nodes} steps={sdLesson.steps} />

          <h3>The concept</h3>
          <p>{sdLesson.concept}</p>

          <div className="callout warn">
            <strong>The trade-off:</strong> {sdLesson.tradeoff}
          </div>
          <div className="callout">
            <strong>Number to remember:</strong> {sdLesson.number}
          </div>

          <h3>The interview line</h3>
          <p>“{sdLesson.interview}”</p>

          <h3>Your mini assignment</h3>
          <p>{sdLesson.assign}</p>

          <button
            className={`btn${done.includes(sdLesson.number) ? "" : " primary"}`}
            onClick={() => toggleDone(sdLesson.number)}
          >
            {done.includes(sdLesson.number) ? "✓ Completed — tap to undo" : "Mark Lesson " + sdLesson.number + " complete"}
          </button>
        </article>
      )}

      <div className="card">
        <h3 style={{ marginTop: 0 }}>The full 40-lesson map</h3>
        <p className="muted small">
          System design in 40 animated lessons, built from the 27-concept checklist — every
          concept gets a lesson, every famous interview problem is shown as a remix of them.
        </p>
        {SD_ROADMAP.map((m, mi) => (
          <div key={m.name} style={{ marginBottom: 12 }}>
            <strong>{m.name}</strong>{" "}
            {mi === 0 ? (
              <span className="badge live">Available</span>
            ) : (
              <span className="badge planned">Coming soon</span>
            )}
            <div className="chips">
              {m.lessons.map((t, i) => (
                <span className="chip" key={i}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Existing reference content: 27 concepts explorer ---------- */}
      <div className="card">
        <h3 style={{ marginTop: 0 }}>27 concepts, not 100 questions</h3>
        <p className="muted" style={{ margin: 0 }}>
          Every system design interview question is a remix of the same building blocks —
          interviewers test the trade-off behind the diagram, not the diagram. Tap any concept
          for what it is and the trade-off to say out loud.
        </p>
      </div>

      <h3>Animated · How a request travels</h3>
      <StepPlayer nodes={SD_PLAYER.nodes} steps={SD_PLAYER.steps} />

      <div className="grid cols3" style={{ margin: "18px 0" }}>
        {REMIXES.map((r) => (
          <div className="card" key={r.title} style={{ marginBottom: 0 }}>
            <h3>{r.title}</h3>
            <p className="muted small">{r.body}</p>
            <div className="chips">
              {r.chips.map((c) => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {SD_GROUPS.map((g, gi) => (
        <div key={g.name}>
          <h3 style={{ margin: "20px 0 10px" }}>{g.name}</h3>
          <div className="grid cols2">
            {g.items.map((item, ii) => {
              const key = `${gi}-${ii}`;
              const isOpen = open === key;
              return (
                <div
                  className="card sd-card"
                  key={key}
                  style={{ marginBottom: 0 }}
                  onClick={() => setOpen(isOpen ? null : key)}
                  role="button"
                  aria-expanded={isOpen}
                >
                  <h3 style={{ fontSize: "1rem" }}>
                    {item[0]} <span className="muted" style={{ float: "right" }}>{isOpen ? "−" : "+"}</span>
                  </h3>
                  <p className="muted small" style={{ margin: 0 }}>{item[1]}</p>
                  {isOpen && <p className="small" style={{ marginBottom: 0 }}>{item[2]}</p>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
