"use client";

import { useEffect, useRef, useState } from "react";

// Animated diagram stage — the heart of the lesson view.
// Props: nodes = [[label, sub], ...], steps = [{ n, cap, metric }, ...]
// Step n = index of the node lit at that step. The stage renders the nodes as
// cards in a flow; below it a caption bar carries the step's caption and its
// metric, with Back / Next / Replay / Play-Pause controls (auto-advance ~2.8s).
export default function StepPlayer({ nodes, steps }) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  const stop = () => {
    setPlaying(false);
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  // Reset whenever a different lesson's steps are handed in.
  useEffect(() => {
    stop();
    setIdx(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  useEffect(() => {
    if (!playing) return undefined;
    timer.current = setInterval(() => {
      setIdx((i) => {
        if (i >= steps.length - 1) {
          stop();
          return i;
        }
        return i + 1;
      });
    }, 2800);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, steps.length]);

  const step = steps[idx];
  const active = step ? step.n : 0;
  const stepPct = steps.length > 1 ? (idx / (steps.length - 1)) * 100 : 100;

  return (
    <div className="stage" aria-label="Animated lesson diagram">
      <div className="stage-nodes">
        {nodes.map((node, i) => (
          <div key={i} style={{ display: "contents" }}>
            <div className={`snode${i === active ? " on" : i < active ? " seen" : " todo"}`}>
              <div className="slabel">{node[0]}</div>
              <div className="ssub">{node[1]}</div>
            </div>
            {i < nodes.length - 1 && <span className="sarrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>

      <div className="captionbar">
        <p className="cap-text">{step ? step.cap : ""}</p>
        {step && step.metric ? <div className="cap-metric">{step.metric}</div> : null}
      </div>

      <div className="stepmeta">
        <span className="stepcount">Step {idx + 1} / {steps.length}</span>
        <div className="stepdots" aria-hidden="true">
          {steps.map((_, i) => (
            <span key={i} className={`dot${i === idx ? " on" : i < idx ? " seen" : ""}`} />
          ))}
        </div>
        <div className="stepbar"><div style={{ width: `${stepPct}%` }} /></div>
      </div>

      <div className="stage-controls">
        <button className="btn" onClick={() => { stop(); setIdx((i) => Math.max(0, i - 1)); }} disabled={idx === 0}>
          Back
        </button>
        <button
          className="btn primary"
          onClick={() => { stop(); setIdx((i) => Math.min(steps.length - 1, i + 1)); }}
          disabled={idx >= steps.length - 1}
        >
          Next
        </button>
        <button className="btn" onClick={() => { stop(); setIdx(0); }}>Replay</button>
        <button className="btn" onClick={() => (playing ? stop() : setPlaying(true))}>
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
