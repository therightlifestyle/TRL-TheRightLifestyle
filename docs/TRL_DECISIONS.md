# TRL — Decision Record

> Append-only. Never edit a decided entry — supersede it with a new one and
> link both directions. Format: ID · title · status · date · context · decision
> · consequences.

Statuses: **ACCEPTED** · **REJECTED** · **OPEN** · **DEFERRED** · **SUPERSEDED**

---

## D-001 — The repository is the source of truth
**Status:** ACCEPTED · 2026-09-17

**Context.** TRL work spans many sessions and agents. Chat history is not
durable, not searchable by the next agent, and not reviewable. A prior session
reported a repository state that did not match the repository.

**Decision.** All durable context lives in `docs/` in this repo. If a fact is
not written here, it does not exist. Every claim must be verifiable against the
repo or a live API before it is recorded.

**Consequences.** Docs must be updated in the same commit as the work.
Stale documentation is a defect, not an inconvenience.

---

## D-002 — Stay on static HTML/CSS/JS; do not adopt Astro
**Status:** REJECTED *(the Astro proposal is rejected; static is retained)* · 2026-09-17
**Decided by:** Rashid Muhammad (founder sign-off)

**Context.** A prior session proposed Astro + TypeScript + Tailwind and recorded
it as the stack, describing this repo as empty. The repo is not empty: it holds
a complete, deployed static site on GitHub Pages with five merged PRs. So the
real question was never "what stack should a greenfield project use" — it was
"is it worth migrating a working, shipping site."

**Decision.** **Reject the migration. TRL stays plain HTML, CSS, and vanilla JS.**

**Reasoning.**
- The site already works and already ships. Astro solves problems TRL does not
  currently have.
- Static deploys on GitHub Pages with no build. Astro needs a build pipeline,
  CI, and a Node version to maintain — new ways to break a site that currently
  cannot break.
- TRL is in revenue-seeking phase. Time spent on a toolchain is time not spent
  on offers and clients.
- Zero dependencies means zero supply-chain risk and no upgrade treadmill.

**Consequences.**
- Accept header/footer duplication across four HTML files (see `TRL_ARCHITECTURE.md` §5).
- **No `package.json` — permanently and deliberately.** Do not add one. Do not
  interpret its absence as missing work.
- Revisit only if page count exceeds ~8–10 or duplication causes a production
  inconsistency. Any revisit requires a new decision record superseding this one.

---

## D-003 — Host on GitHub Pages from `main` root
**Status:** ACCEPTED · 2026-09-17

**Context.** Hosting was listed as open. In fact Pages is already configured,
built, and serving.

**Decision.** GitHub Pages, source `main` @ `/`, HTTPS enforced, no custom
domain. The `CNAME` file was deliberately removed (PR #4) so the `github.io`
URL serves directly.

**Consequences.** Free and automatic. Every push to `main` is a production
deploy — `main` must always be releasable. Canonical URL, `sitemap.xml`, and
`robots.txt` are all pinned to the `github.io` address and must be updated
together if a domain is ever added.

---

## D-004 — Inquiry delivery stays WhatsApp-only for now
**Status:** DEFERRED to Gate 3 · 2026-09-17

**Context.** A static site cannot receive a form POST. Options: a third-party
form service (Formspree/Getform), a serverless function, or WhatsApp deep links
only. Today the site uses `wa.me` links plus published email addresses.

**Decision.** Keep WhatsApp + email. Do not add a form backend yet.

**Reasoning.** WhatsApp is already the founder's fastest channel (~1 hour
response) and is dominant in the Pakistani market. A form backend adds a
dependency, a privacy surface, and a spam problem to solve a demand that has
not been demonstrated.

**Consequences.** Visitors who will not use WhatsApp have only email. Drop-offs
are invisible — no capture, no analytics. Tracked as **R-4**. Revisit when
there is evidence of lost inquiries.

---

## D-005 — No fabricated proof, ever
**Status:** ACCEPTED · 2026-09-17

**Context.** TRL is early. The temptation to display invented testimonials,
client logos, revenue figures, or case studies is the fastest way to destroy a
founder-led brand.

**Decision.** Nothing ships that did not happen. No fake testimonials, no
invented metrics, no placeholder logos presented as clients, no fake checkout.
Where TRL lacks proof, it says so — "Phase 1 · Foundation · Building in public"
is honest positioning, not a weakness.

**Consequences.** Marketing copy must lean on the offer and the standard rather
than on social proof until real proof exists. Applies to every TRL property,
not just this repo.

---

## D-006 — Gate discipline
**Status:** ACCEPTED · 2026-09-17

**Decision.** Work proceeds in numbered gates. A gate has written exit criteria
in `TRL_STATE.md`. No gate opens until the previous one's criteria are met and
documented.

**Consequences.** Slower starts, far fewer half-finished threads. An agent that
wants to skip ahead must first write down why the current gate is complete.

---

## D-007 — Gate 0 is documentation only
**Status:** ACCEPTED · 2026-09-17

**Context.** The original Gate 0 brief said "clean fresh repo… no app code."
Taken literally against this repository that meant deleting a live, deployed
site. The founder confirmed the intent was the memory system, not a reset.

**Decision.** Gate 0 adds `docs/`, `.gitignore`, and `.env.example`. It
modifies **zero** site files. No `index.html`, `style.css`, `script.js`, or
page content is touched.

**Consequences.** No tests run — correctly, since no application code changed.
The live site is provably unaffected: the diff contains only new files.

---

## D-008 — Reject the repository reset
**Status:** ACCEPTED · 2026-09-17

**Context.** A prior session authorised a "clean init" believing the repo was
empty. It was not. Executing that authorisation would have deleted `index.html`
(478 lines), `style.css` (501 lines), `script.js`, three content pages, and
broken the live GitHub Pages site until a replacement shipped.

**Decision.** The reset authorisation is **revoked**. The existing site is the
asset TRL is building on.

**Consequences.** Supersedes any earlier "clean init authorized" note. Destructive
operations on tracked site files now require explicit, specific founder
confirmation naming the files.

---

## D-009 — Published business contact details are not secrets
**Status:** ACCEPTED · 2026-09-17

**Context.** The repo contains a WhatsApp number, two email addresses, and
social handles. A naive secret scan flags these.

**Decision.** These are **intentionally public** business contact details — the
entire conversion path depends on them. They are not credentials and must not
be redacted or moved to environment variables.

**Consequences.** `TRL_SECURITY.md` §4 records them explicitly as known-public
so no future audit "fixes" them and silently breaks every call-to-action.
