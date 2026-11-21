# Akhi's Lab

Akhilesh Appala's personal learning site — one place to learn many things, built as a proper
Next.js app (App Router, React, plain JavaScript) and ready to deploy on Vercel with zero config.

## What's inside

- **Learn** — the Forward Deployed Engineer (FDE) Full Course, Module 1 (Days 1–15) as
  interactive lessons: an animated step-by-step diagram player (Play / Next / Back / Replay),
  the concept, real code with a copy button and expected output, the common mistake, the FDE
  angle, and a 15-minute assignment per day. Progress is checkable and saved in the browser
  (localStorage), with search across lessons and the full 90-day roadmap.
- **System Design** — an animated "How a request travels" player, the three remix examples
  (Instagram = caching + CDN + queues; URL shortener = APIs + indexing + replication;
  Uber = load balancing + latency + monitoring), and all 27 core system design concepts in
  five groups, each expandable with its trade-off.
- **Interview Prep** — the three FDE interview rounds (coding, system design, customer
  roleplay), numbers to know cold, quick-fire flashcards, and roleplay prompts.
- **Projects** — Akhilesh's portfolio: Akhi's Lab itself, Ticket Analyzer CLI, Support Desk
  API, RAG Chatbot, Support Agent, FDE Capstone, and the SSAkhi channel. Add / edit / delete
  is supported in the browser (localStorage).
- **About** — public-safe profile and links (GitHub, DevHacks-Akhi, SSAkhi).

Content lives in `data/` (`lessons.js`, `systemDesign.js`, `interview.js`, `projects.js`) —
future lessons and projects are added as data, not code.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Production check:

```bash
npm run build
npm run start
```

## Deploy on Vercel

1. Push this project to the GitHub repo: https://github.com/akhileshappala/akhis-lab
   (the Next.js app should sit at the repo root, replacing the earlier single-file HTML
   placeholder).
2. Go to https://vercel.com, sign in with GitHub, and click **Add New → Project**.
3. Import `akhileshappala/akhis-lab`. Vercel auto-detects Next.js — no build settings to
   change (Framework Preset: Next.js, default build command and output).
4. Click **Deploy**. Every later push to the repo's main branch redeploys automatically.
