"use client";

import { useState } from "react";
import { FLASHCARDS, NUMBERS, ROLEPLAY, ROUNDS } from "../data/interview";

export default function InterviewTab() {
  const [revealed, setRevealed] = useState({});

  return (
    <section>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>FDE interview prep</h3>
        <p className="muted" style={{ margin: 0 }}>
          The FDE interview is three tests at once: can you code, can you design, and can you
          sit with a customer and find the real problem. Prep for all three here.
        </p>
      </div>

      <div className="grid cols3">
        {ROUNDS.map((r) => (
          <div className="card" key={r.name} style={{ marginBottom: 0 }}>
            <h3>{r.name}</h3>
            <p className="muted small" style={{ margin: 0 }}>{r.body}</p>
          </div>
        ))}
      </div>

      <h3 style={{ margin: "22px 0 10px" }}>Numbers worth knowing cold</h3>
      <div className="grid cols2">
        {NUMBERS.map((n) => (
          <div className="card" key={n[0]} style={{ marginBottom: 0 }}>
            <h3 style={{ color: "var(--accent)" }}>{n[0]}</h3>
            <p className="muted small" style={{ margin: 0 }}>{n[1]}</p>
          </div>
        ))}
      </div>

      <h3 style={{ margin: "22px 0 10px" }}>Quick-fire flashcards — tap to reveal</h3>
      <div className="grid cols2">
        {FLASHCARDS.map((f, i) => {
          const isOpen = !!revealed[i];
          return (
            <button
              key={i}
              className="card flash"
              onClick={() => setRevealed((r) => ({ ...r, [i]: !r[i] }))}
              aria-expanded={isOpen}
            >
              <strong>{f[0]}</strong>
              {isOpen ? (
                <span className="a" style={{ display: "block" }}>{f[1]}</span>
              ) : (
                <span className="a" style={{ display: "block" }}>Tap to reveal the answer →</span>
              )}
            </button>
          );
        })}
      </div>

      <h3 style={{ margin: "22px 0 10px" }}>Customer roleplay prompts</h3>
      {ROLEPLAY.map((p, i) => (
        <div className="callout" key={i}><p style={{ margin: 0 }}>{p}</p></div>
      ))}
    </section>
  );
}
