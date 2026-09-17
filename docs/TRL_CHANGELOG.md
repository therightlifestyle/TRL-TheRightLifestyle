# TRL — Changelog

Newest first. Site changes and documentation changes both belong here.

---

## 2026-09-17 — Gate 0: permanent memory system

**Added** — `docs/` (9 documents), `.gitignore`, `.env.example`.
**Changed** — nothing. Zero site files modified (D-007).

Established the repo as durable memory: master context, operating state,
as-built architecture, decision record (D-001…D-009), Phase 1 plan, security
baseline, deployment runbook, this changelog, and the session handoff.

**Corrections to previously reported state.** The incoming handoff described a
different repository. Verified against the repo and the GitHub API:

- Claimed "no prior TRL codebase exists" → **8 sibling repos exist** in the org.
- Claimed "no GitHub remote, sandbox only" → **remote configured, Pages live,
  PRs #1–#5 merged.**
- Claimed "commit `c6e8019`, 11 new doc files, `docs/` × 9" → **not a valid
  object; no `docs/` existed.** The 11 tracked files were the site.
- Claimed "clean fresh repo, no app code" → **a complete, deployed static site.**

**Decisions.** D-002 Astro migration **rejected** — static HTML/CSS/JS retained
by founder sign-off. D-003 GitHub Pages confirmed. D-004 inquiry delivery
deferred to Gate 3. D-008 repository reset **revoked** — executing it would have
deleted the live site.

---

## 2026-09-17 — PR #5: fix stale repo name in ecosystem table
Corrected an outdated repository name in the README ecosystem table.

## 2026-09-17 — PR #4: serve on the default `github.io` URL
Removed the custom domain / `CNAME` so the site resolves at
`therightlifestyle.github.io/TRL-TheRightLifestyle/`. Fixed reachability.

## 2026-09-17 — PR #3: structure and responsive polish
Site structure cleanup and responsive UX improvements.

## 2026-09-17 — PR #2: flagship site
Added `index.html`, `style.css`, `script.js`, `about.html`, `privacy.html`,
`404.html`, `favicon.svg`, `robots.txt`, `sitemap.xml` — the design system and
trust pages.

## 2026-09-17 — PR #1: flagship README
409-line canonical README unifying mission, offers, pricing, ecosystem, and
roadmap into a single HQ document.
