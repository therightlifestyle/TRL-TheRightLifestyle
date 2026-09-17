# TRL — Master Context

> **Read this first.** Every agent and collaborator starts here.
> If this document and any other document disagree, **this one wins** — then fix the other.

**Last verified:** 2026-09-17 · **Verified against:** live repo state + GitHub org API

---

## 1. What TRL is

**The Right Lifestyle (TRL)** — "The Operating System for Ambition."

Founder-led by **Rashid Muhammad**, based in Rawalpindi, Pakistan. TRL sells
done-for-you services today (audits, automation, websites, consulting) and is
building toward a full operating system for personal and business execution.

The business model is **services now, software later**. Revenue comes from
scoped client work confirmed over WhatsApp. There is no checkout, no payment
processor, and no user accounts in any TRL property.

---

## 2. What this repository is

`therightlifestyle/TRL-TheRightLifestyle` is the **flagship HQ** — the canonical
public home for the TRL mission, offers, standards, and roadmap.

It is a **plain static website**: hand-written HTML, CSS, and vanilla JavaScript.
There is **no build step, no package manager, no framework, and no backend.**
GitHub Pages serves the repository root directly.

**This is a deliberate architecture, not an unfinished one.** See `TRL_DECISIONS.md` D-002.

### 2.1 The absence of `package.json` is intentional

There is no `package.json`, no `node_modules`, no bundler config, and no CI
build pipeline. This is **correct and expected**.

**Do not "restore" a toolchain. Nothing is missing.** A future agent scanning
this repo and finding no manifest is looking at a finished decision, not lost
work. Adding a build step would break the zero-config GitHub Pages deploy
described in `TRL_DEPLOYMENT.md` and must go through the decision process in
`TRL_DECISIONS.md`.

---

## 3. Current reality (verified, not aspirational)

| Fact | Value |
|---|---|
| Live URL | https://therightlifestyle.github.io/TRL-TheRightLifestyle/ |
| Pages status | `built`, HTTPS enforced, source `main` @ `/` |
| Remote | `https://github.com/therightlifestyle/TRL-TheRightLifestyle.git` |
| Default branch | `main` |
| Merged PRs | #1–#5 |
| Tracked site files | 11 (see §4) |
| Build tooling | none, by design |
| Backend / API | none |
| Secrets required | none |

---

## 4. Repository contents

| File | Role |
|---|---|
| `index.html` | Flagship landing page — hero, offers, pricing, process, vision, standards, contact |
| `about.html` | Founder and mission page |
| `privacy.html` | Privacy policy |
| `404.html` | Custom not-found page (GitHub Pages `custom_404`) |
| `style.css` | Complete design system — CSS custom properties, layout, components |
| `script.js` | Vanilla JS: mobile nav, scroll header, WhatsApp quote helper |
| `favicon.svg` | Brand mark |
| `robots.txt` | Crawler policy + sitemap pointer |
| `sitemap.xml` | Three indexed URLs |
| `README.md` | Public-facing flagship README (409 lines) |
| `LICENSE` | MIT |

---

## 5. The TRL ecosystem — sibling repositories

TRL grew across several repos before this flagship existed. **They are real and
they still exist.** Any claim that "no prior TRL codebase exists" is false; it
has been made before and caused a near-miss.

| Repo | Last push | Size | What it holds |
|---|---|---|---|
| `The-Right-Lifetsyle` | 2026-09-15 | 1.7 MB | `app.html`, `admin.html`, execution pack, site review — largest prior build |
| `TRL-DIGITAL-SERVICES` | 2026-09-16 | 537 KB | Filterable service catalog, estimate wizard → WhatsApp |
| `TRL` | 2026-08-11 | 133 KB | `server/`, `docs/`, `admin/`, service worker, `package.json` |
| `TRL-OS` | 2026-09-14 | 90 KB | `package.json` + a `tests/` directory |
| `TRL-1` | 2026-08-11 | 87 KB | 20+ pages, full OS architecture, browser-local Focus tool |
| `TRL-WEB-PHASE-1` | 2026-08-04 | 44 KB | Earliest public funnel |
| `TRL-Site` | 2026-09-16 | 14 KB | Honesty-first $35 Micro Audit funnel |
| `micro-audit` | 2026-09-12 | 10 KB | Standalone audit landing page |

**None of these has been audited or classified.** That work is tracked as
**R-1** in `TRL_STATE.md` and is the first task of Gate 1.

---

## 6. Non-negotiable rules

1. **No fabricated proof.** No invented testimonials, client counts, revenue
   figures, case studies, or logos. If it did not happen, it does not ship.
   (`TRL_DECISIONS.md` D-005.)
2. **No fake checkouts.** Every quote is confirmed by a human on WhatsApp.
3. **The repo is the source of truth.** Decisions live in `docs/`, not in chat
   history. (D-001.)
4. **Never break the live site.** `main` is deployed on every push. A broken
   commit on `main` is a public outage.
5. **Gate discipline.** Finish and document a gate before opening the next. (D-006.)
6. **Verify before you write.** Check the actual repo and the actual GitHub org
   before recording any claim. Prior sessions recorded unverified state and it
   was wrong. (`TRL_SESSION_HANDOFF.md`.)

---

## 7. Contact & brand facts

| Channel | Value |
|---|---|
| WhatsApp (primary) | +92 319 0091457 |
| Builder community | WhatsApp group (link in README) |
| Founder email | rashidmuhammadamir@gmail.com |
| Services email | officialtrlservice@gmail.com |
| Instagram | @the.right.lifestyle |

These are **published business contact details**, not secrets. They belong in
the repo. See `TRL_SECURITY.md` §4.

> **Name note:** the repo slug `TRL-TheRightLifestyle` is kept for URL
> stability. The sibling repo `The-Right-Lifetsyle` contains a typo in its slug
> and is likewise kept for stability. The brand is always **The Right Lifestyle**.

---

## 8. Document map

| Document | Answers |
|---|---|
| `TRL_MASTER_CONTEXT.md` | What is TRL and what is true right now |
| `TRL_STATE.md` | What gate are we in, what is open, what is at risk |
| `TRL_ARCHITECTURE.md` | How the site is actually built |
| `TRL_DECISIONS.md` | What was decided and why (D-001…) |
| `TRL_PHASE_1_PLAN.md` | What happens next, with exit criteria |
| `TRL_SECURITY.md` | Threat model and secret-handling baseline |
| `TRL_DEPLOYMENT.md` | How the site ships and how to roll back |
| `TRL_CHANGELOG.md` | What changed, when |
| `TRL_SESSION_HANDOFF.md` | Live handoff between working sessions |
