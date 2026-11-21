"use client";

import { useEffect, useRef, useState } from "react";

// Generic animated step player.
// Props: nodes = [[label, sub], ...], steps = [{ n, cap, metric }, ...]
// Step n = index of the node lit at that step.
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
    }, 1800);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, steps.length]);

  const step = steps[idx];
  const active = step ? step.n : 0;

  return (
    <div className="player">
      <div className="player-nodes">
        {nodes.map((node, i) => (
          <div key={i} style={{ display: "contents" }}>
            <div className={`pnode${i === active ? " on" : i < active ? " seen" : ""}`}>
              <div className="plabel">{node[0]}</div>
              <div className="psub">{node[1]}</div>
            </div>
            {i < nodes.length - 1 && <span className="parrow">→</span>}
          </div>
        ))}
      </div>
      <div className="player-cap">
        <p style={{ margin: "0 0 4px" }}>{step ? step.cap : ""}</p>
        {step && step.metric ? <span className="metric">{step.metric}</span> : null}
      </div>
      <div className="player-controls">
        <button className="btn primary" onClick={() => (playing ? stop() : setPlaying(true))}>
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
        <button className="btn" onClick={() => { stop(); setIdx((i) => Math.max(0, i - 1)); }}>← Back</button>
        <button className="btn" onClick={() => { stop(); setIdx((i) => Math.min(steps.length - 1, i + 1)); }}>Next →</button>
        <button className="btn" onClick={() => { stop(); setIdx(0); }}>↺ Replay</button>
        <span className="stepcount">Step {idx + 1} / {steps.length}</span>
      </div>
    </div>
  );
}
