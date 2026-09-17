# TRL — Operating State

> Living status board. Update it in the same commit as the work it describes.

**Last updated:** 2026-09-17 · **Current gate:** Gate 0 — complete

---

## 1. Gate status

| Gate | Name | Status |
|---|---|---|
| **Gate 0** | Permanent memory system | ✅ **Complete** — `docs/` written and verified against live state |
| **Gate 1** | Ecosystem audit + consolidation plan | ⬜ Not started — blocked on nothing, ready to open |
| **Gate 2** | Content & conversion pass on flagship | ⬜ Not started |
| **Gate 3** | Inquiry capture beyond WhatsApp | ⬜ Not started — depends on D-004 |

### Gate 0 exit criteria — all met

- [x] `docs/` memory system exists and is committed
- [x] Every claim verified against the actual repo and GitHub org API
- [x] Stack decision recorded with reasoning (D-002 — **static retained**)
- [x] Security baseline written
- [x] Deployment and rollback documented
- [x] Open risks enumerated with owners
- [x] Live site untouched — zero site files modified

---

## 2. What is actually live

- **Site:** https://therightlifestyle.github.io/TRL-TheRightLifestyle/ — `built`, HTTPS enforced
- **Branch deployed:** `main`, root directory
- **Last site change:** PR #5 (stale repo name fix on the ecosystem table)
- **Working tree:** clean

---

## 3. Open risks

| ID | Sev | Risk | Status |
|---|---|---|---|
| **R-1** | 🔴 High | **8 sibling TRL repos have never been audited.** No KEEP/REFACTOR/REPLACE/ARCHIVE/REMOVE classification exists. `The-Right-Lifetsyle` (1.7 MB) and `TRL` (has `server/`, `docs/`) may contain work worth preserving or content that contradicts the flagship. | **Open** — first task of Gate 1 |
| **R-2** | 🟡 Med | **Pricing is published but unvalidated.** The README lists 10 price points (`$35`→`$1,999`, PKR equivalents). No record of a client paying these rates. Not dishonest — it is a published rate card — but it is unproven. | Open — track first real sale |
| **R-3** | 🟡 Med | **Cross-repo content drift.** Sibling repos publish their own pricing and claims. Nothing keeps them consistent with the flagship. A visitor can find two different prices for the same service. | Open — resolve during Gate 1 |
| **R-4** | 🟢 Low | **Single contact channel.** Inquiry flow is WhatsApp-only via `wa.me` deep link. No fallback if a visitor will not use WhatsApp, and no capture of drop-offs. | Open — D-004 |
| **R-5** | 🟢 Low | **Unmerged branch `arena/01a0af39`** carries `.editorconfig` and `.gitattributes` not present on `main`. Minor divergence. | Open — cherry-pick or close |

### Risks closed by this session

| ID | Was claimed | Verified reality |
|---|---|---|
| ~~R-1 (old)~~ | "No prior TRL codebase exists anywhere" | **False.** 8 repos exist in the org. Reopened as R-1 above with real scope. |
| ~~R-2 (old)~~ | "No GitHub remote; lives only in the sandbox" | **False.** Remote exists, 5 PRs merged, Pages live and serving. |
| ~~R-3 (old)~~ | "Architecture doc is proposed, not reality" | **Resolved.** `TRL_ARCHITECTURE.md` now documents the shipped static site as-built. |

---

## 4. Decisions awaiting sign-off

None. D-002 (stack) was the last open one and is now **resolved as REJECTED** —
TRL stays on static HTML/CSS/JS. D-003 (hosting) is resolved. D-004 (inquiry
delivery) is deferred to Gate 3 by decision, not by neglect.

---

## 5. Correction log

Prior-session claims that failed verification on 2026-09-17:

| Claim | Reality |
|---|---|
| "Clean fresh repo, no app code" | Repo contains a complete, deployed 11-file static site |
| "Commit `c6e8019` on `main`" | Not a valid object in this repository |
| "11 new files, all documentation, `docs/` × 9" | No `docs/` directory existed; the 11 files were site files |
| "PR: none — no remote exists yet" | Remote configured; PRs #1–#5 merged |
| "Astro + TS + Tailwind proposed" | Recorded as **REJECTED**; static retained (D-002) |

**Root cause:** state was reported without being read from the repo.
**Mitigation:** Master Context rule 6 — verify before you write.

---

## 6. Next single action

**Open Gate 1: audit the 8 sibling repositories.** Clone each, inventory its
content, and classify it KEEP / REFACTOR / REPLACE / ARCHIVE / REMOVE in a new
`docs/TRL_INVENTORY.md`. Closes R-1 and scopes R-3.

No site code changes until that inventory exists.
