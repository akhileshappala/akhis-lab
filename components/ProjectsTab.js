"use client";

import { useEffect, useState } from "react";
import { SEED_PROJECTS } from "../data/projects";

const KEY = "akhis-lab-projects";
const EMPTY = { name: "", status: "planned", problem: "", stack: "", learned: "" };

export default function ProjectsTab() {
  const [projects, setProjects] = useState(SEED_PROJECTS);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(-1);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProjects(JSON.parse(raw));
    } catch {}
  }, []);

  const save = (next) => {
    setProjects(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editing >= 0) {
      const next = projects.slice();
      next[editing] = form;
      save(next);
    } else {
      save([...projects, form]);
    }
    setForm(EMPTY);
    setEditing(-1);
    setShowForm(false);
  };

  const startEdit = (i) => {
    setForm(projects[i]);
    setEditing(i);
    setShowForm(true);
  };

  const remove = (i) => save(projects.filter((_, j) => j !== i));

  return (
    <section>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Projects — the portfolio is the proof</h3>
        <p className="muted" style={{ margin: "0 0 12px" }}>
          Everything Akhilesh builds in his free time, in one place. Edits are kept in this
          browser (localStorage).
        </p>
        <button
          className="btn primary"
          onClick={() => { setForm(EMPTY); setEditing(-1); setShowForm((s) => !s); }}
        >
          {showForm ? "Close form" : "+ Add a project"}
        </button>
        {showForm && (
          <form onSubmit={submit} style={{ marginTop: 16 }}>
            <label className="f">Name
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </label>
            <label className="f">Status
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="live">Live</option>
                <option value="building">Building</option>
                <option value="planned">Planned</option>
              </select>
            </label>
            <label className="f">The problem it solves
              <textarea rows={2} value={form.problem} onChange={(e) => setForm({ ...form, problem: e.target.value })} />
            </label>
            <label className="f">Tech stack (separate with · )
              <input type="text" value={form.stack} onChange={(e) => setForm({ ...form, stack: e.target.value })} />
            </label>
            <label className="f">What I learned
              <textarea rows={2} value={form.learned} onChange={(e) => setForm({ ...form, learned: e.target.value })} />
            </label>
            <button className="btn primary" type="submit">{editing >= 0 ? "Save changes" : "Add project"}</button>
          </form>
        )}
      </div>

      <div className="grid cols2">
        {projects.map((p, i) => (
          <div className="card" key={i} style={{ marginBottom: 0 }}>
            <h3>
              {p.name}{" "}
              <span className={`badge ${p.status}`} style={{ float: "right" }}>{p.status}</span>
            </h3>
            <p className="muted small">{p.problem}</p>
            {p.stack ? (
              <div className="chips">
                {p.stack.split("·").map((s, j) => (
                  <span className="chip" key={j}>{s.trim()}</span>
                ))}
              </div>
            ) : null}
            {p.learned ? <p className="small"><strong>What I learned:</strong> {p.learned}</p> : null}
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button className="btn" onClick={() => startEdit(i)}>Edit</button>
              <button className="btn danger" onClick={() => remove(i)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
