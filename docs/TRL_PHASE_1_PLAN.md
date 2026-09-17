# TRL — Phase 1 Plan

**Phase 1 goal:** a coherent, honest, single-source TRL presence that converts
visitors into WhatsApp conversations — with no fabricated proof and no broken
promises across repos.

---

## Gate 1 — Ecosystem audit & consolidation plan

**Why first.** Eight sibling repos are publicly live and unaudited (**R-1**).
Several publish their own pricing and claims, so a visitor can currently find
two different prices for the same service (**R-3**). Until TRL knows what is out
there, every flagship improvement risks contradicting something already public.

**Tasks**

1. Clone and inventory all eight: `The-Right-Lifetsyle`, `TRL`, `TRL-1`,
   `TRL-OS`, `TRL-DIGITAL-SERVICES`, `TRL-WEB-PHASE-1`, `TRL-Site`, `micro-audit`.
2. For each, record: purpose, live URL and status, last push, published
   pricing, any claim of proof, and unique assets worth keeping.
3. Classify each — **KEEP · REFACTOR · REPLACE · ARCHIVE · REMOVE.**
4. Flag every pricing or claim conflict against the flagship README.
5. Flag any fabricated proof found (D-005) as urgent.
6. Write `docs/TRL_INVENTORY.md`.

**Exit criteria**
- [ ] All 8 repos inventoried and classified with reasoning
- [ ] Conflict list produced
- [ ] `TRL_INVENTORY.md` committed
- [ ] R-1 closed; R-3 scoped into concrete tasks

**Explicitly out of scope:** deleting or archiving anything. Gate 1 produces a
plan; execution is Gate 1.5 with founder sign-off per repo.

---

## Gate 1.5 — Execute consolidation

Archive superseded repos, redirect their pages to the flagship, and reconcile
pricing to one canonical rate card. Each destructive action needs explicit
per-repo approval (D-008).

**Exit:** one canonical price list across all live TRL properties; superseded
repos archived with a pointer to the flagship.

---

## Gate 2 — Flagship conversion pass

With a clean ecosystem, improve the site itself.

- Tighten hero and offer copy against the single canonical rate card
- Strengthen the path from landing → offer → WhatsApp
- Accessibility pass: contrast, focus states, keyboard traversal, heading order
- Performance: consider self-hosting fonts (`TRL_SECURITY.md` §5)
- Re-verify: no fabricated proof anywhere on the site

**Exit:** every CTA reaches WhatsApp with correct prefilled context; no
contradictions with `TRL_INVENTORY.md`; accessibility checks pass.

---

## Gate 3 — Inquiry capture (conditional)

**Only open if** Gate 2 produces evidence of lost inquiries (R-4). Revisits
D-004. Options: third-party form service, serverless function, or keep
WhatsApp-only. Whatever is chosen must not break the zero-build deploy (D-002)
and must update `privacy.html` in the same commit.

---

## Not in Phase 1

The TRL OS product, user accounts, payments, a CMS, and a framework migration
(D-002). Phase 1 is about coherence and conversion, not new software.

---

## Standing rules

- One gate at a time (D-006).
- Verify against the repo and the GitHub API before recording anything (D-001).
- Never break the live site — `main` is production (`TRL_DEPLOYMENT.md`).
- Update `docs/` in the same commit as the work.
