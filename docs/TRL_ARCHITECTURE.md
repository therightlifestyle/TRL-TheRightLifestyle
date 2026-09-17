# TRL — Architecture

> **Status: AS-BUILT.** This describes the site that is running in production
> right now, verified 2026-09-17. It is not a proposal.

---

## 1. Shape

```
Visitor browser
      │  HTTPS
      ▼
GitHub Pages CDN  ──serves──►  repo root of `main`, unmodified
      │
      ├── index.html      (landing)
      ├── about.html      (founder/mission)
      ├── privacy.html    (policy)
      ├── 404.html        (custom not-found)
      ├── style.css       (design system)
      ├── script.js       (progressive enhancement)
      ├── favicon.svg · robots.txt · sitemap.xml
      │
      └──► outbound only: wa.me deep links, mailto:, Google Fonts
```

**There is no server, no database, no API, and no build step.** The files in
the repository are byte-for-byte the files the browser receives.

---

## 2. Technology

| Layer | Choice | Notes |
|---|---|---|
| Markup | Hand-written HTML5 | Semantic landmarks, skip link, ARIA on nav |
| Styling | Single `style.css` | CSS custom properties; no preprocessor |
| Behaviour | One vanilla JS IIFE, `'use strict'` | Zero dependencies |
| Fonts | Instrument Sans + JetBrains Mono | Google Fonts, `preconnect` |
| Hosting | GitHub Pages (legacy build) | Free, HTTPS enforced |
| Build | **None** | Intentional — D-002 |

---

## 3. Design system (`style.css`)

Themed entirely through CSS custom properties on `:root` — colours (`--text`,
`--text-secondary`, `--surface`, `--surface-alt`, `--border`, `--border-subtle`),
layout widths (`--content-narrow`), and brand blue `#2563eb` (also the
`theme-color` meta).

Component classes: `.site-header` · `.brand` · `.nav-links` · `.mobile-menu-btn`
· `.hero` · `.btn-primary` · `.btn-ghost` · `.section-label` · `.cta-small`
· `.skip-link` · `.quote-preview` · `.quote-link`.

Because everything routes through custom properties, a rebrand is a variable
change, not a sweep.

---

## 4. Behaviour (`script.js`)

Three features, all progressive enhancement — the site is fully readable and
navigable with JavaScript disabled.

### 4.1 Mobile navigation
Toggles `.open` on `#nav`, keeps `aria-expanded` in sync, auto-closes on link click.

### 4.2 Scroll-aware header
Adds border and shadow past 20 px. Uses `requestAnimationFrame` with a `ticking`
guard and a `{ passive: true }` listener — no scroll jank.

### 4.3 WhatsApp quote helper
Injected after `#pricing` at runtime. The visitor picks a service tier and adds
optional notes; the script composes a message and produces a `wa.me` link with
`encodeURIComponent`.

**Security-relevant detail:** the preview is assembled with
`document.createElement` + `.textContent` and `replaceChildren()` — never
`innerHTML` — so visitor-typed notes can never be parsed as HTML. This is the
one place user input touches the DOM, and it is XSS-safe by construction. Any
future edit here must preserve that property. See `TRL_SECURITY.md` §3.

**No data leaves the browser.** Nothing is posted anywhere; the visitor chooses
to open WhatsApp. There is no analytics, no tracking pixel, and no cookie.

---

## 5. Why static — and what it costs

**What it buys:** zero hosting cost · zero build failures · nothing to patch ·
sub-second loads · the deployed artifact is exactly the reviewed source ·
no supply-chain surface.

**What it costs — accept these honestly:**

- **No components.** The header and footer are duplicated across four HTML
  files. A nav change is a four-file edit. This is the real tax and it grows.
- **No type safety** and no compile-time checking.
- **No server-side anything** — no form POST endpoint, no dynamic content.
- **Manual sitemap.** New pages must be added to `sitemap.xml` by hand.

**The breaking point:** when page count passes roughly 8–10, or when the
duplicated chrome causes a visible inconsistency in production, revisit D-002.
Until then the tax is cheaper than a toolchain.

---

## 6. Constraints any change must respect

1. The repo root must remain directly servable — `index.html` at root, relative asset paths.
2. No step may be required between `git push` and a correct live site.
3. No dependency may be added without a decision record.
4. `script.js` must stay optional — no content may depend on it.
5. User input must never reach `innerHTML`.
