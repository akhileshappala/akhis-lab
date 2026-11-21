"use client";

import { useState } from "react";
import { SD_GROUPS, SD_PLAYER } from "../data/systemDesign";
import StepPlayer from "./StepPlayer";

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

  return (
    <section>
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
