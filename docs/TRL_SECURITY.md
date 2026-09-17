# TRL — Security Baseline

**Last reviewed:** 2026-09-17 · **Scope:** this repository and its deployment

---

## 1. Attack surface

A static site with no backend has a genuinely small surface. Being precise
about it matters more than a long generic checklist.

| Surface | Present? | Notes |
|---|---|---|
| Server-side code | ❌ | No server exists |
| Database | ❌ | Nothing stored |
| Authentication | ❌ | No accounts |
| User input processing | ⚠️ | One client-side field — §3 |
| Third-party runtime deps | ❌ | Zero npm packages |
| External resources | ⚠️ | Google Fonts — §5 |
| Secrets | ❌ | None needed — §2 |
| Payment handling | ❌ | Quotes confirmed by human on WhatsApp |

**The realistic threats are:** (a) XSS via the quote helper, (b) a malicious or
compromised outbound link, (c) someone committing a credential in future,
(d) repository takeover via compromised GitHub account.

---

## 2. Secrets policy

**This project currently requires no secrets.** No API keys, no tokens, no
database URLs, no service credentials. `.env.example` exists to document that
fact and to set the pattern before the first secret ever appears.

**Rules:**

1. Never commit a real credential. `.env`, `.env.local`, `.env.*` are gitignored.
2. `.env.example` holds **placeholders only** — never a real value, not even a
   revoked or expired one.
3. A static site has **no private runtime**. Anything shipped to the browser is
   public by definition. If a future feature needs a secret, it needs a server
   or a serverless function — it cannot live in `script.js`.
4. If a credential is ever committed: **rotate it first**, then purge history.
   Rewriting history without rotating is theatre — the value is already scraped.

**Scan result, 2026-09-17:** repository scanned across all tracked files. Zero
credentials, zero tokens, zero keys.

---

## 3. XSS — the one real code risk

`script.js` builds a WhatsApp message from a visitor-supplied notes field. This
is the only place untrusted input touches the DOM.

**It is currently safe, by construction.** The implementation uses
`replaceChildren()` with nodes built via `document.createElement` and assigned
through `.textContent`. The URL is built with `encodeURIComponent`. No
`innerHTML`, no `insertAdjacentHTML`, no `eval`.

**Rules for anyone editing this code:**

- ❌ Never assign user input to `innerHTML` / `outerHTML` / `insertAdjacentHTML`
- ❌ Never interpolate user input into a template literal that becomes HTML
- ✅ Always `.textContent`; always `encodeURIComponent` for URL parameters
- ✅ Keep `rel="noopener noreferrer"` on any `target="_blank"` link

---

## 4. Known-public values — do not redact

These are **published business contact details**, deliberately in the source.
A secret scanner will flag them; that is a false positive. Removing them breaks
every call-to-action on the site. Recorded as decision D-009.

| Value | Where | Why public |
|---|---|---|
| `+92 319 0091457` | `wa.me` links, README | Primary sales channel |
| `rashidmuhammadamir@gmail.com` | README, pages | Founder contact |
| `officialtrlservice@gmail.com` | README, pages | Services contact |
| WhatsApp community invite | README | Open community |
| `@the.right.lifestyle` | README | Public social |

---

## 5. Third-party resources

**Google Fonts** (`fonts.googleapis.com`, `fonts.gstatic.com`) is the only
external runtime dependency. It exposes visitor IPs to Google and is a
theoretical availability dependency. `preconnect` is configured; `crossorigin`
is set correctly on the `gstatic` hint.

*Optional hardening:* self-host the two font families to remove the dependency
entirely. Not urgent; noted for a future pass.

**Outbound links** go to `wa.me`, `mailto:`, and sibling TRL GitHub Pages sites.
All are first-party-controlled or well-known destinations.

---

## 6. Repository and deployment security

- `main` is the production branch — **every push deploys**. Treat push access as
  production access.
- Recommended: require PR review before merge to `main`, and enable 2FA on the
  GitHub account. *(Not currently enforced — process gap, not a code defect.)*
- GitHub Pages serves over HTTPS with `https_enforced: true`.
- No GitHub Actions workflows exist, so there is no CI secret store and no
  workflow-injection surface.

---

## 7. Privacy posture

The site sets **no cookies**, runs **no analytics**, loads **no tracking
pixels**, and transmits **nothing** a visitor types. The quote helper composes
text locally; the visitor decides whether to open WhatsApp.

This is a genuinely strong privacy position and `privacy.html` can state it
plainly. **If analytics is ever added, this section and `privacy.html` must be
updated in the same commit.**

---

## 8. Pre-merge checklist

- [ ] No credential, token, or key in the diff
- [ ] No user input reaching `innerHTML`
- [ ] No new third-party script or dependency (or: a decision record exists)
- [ ] External `target="_blank"` links carry `rel="noopener noreferrer"`
- [ ] Privacy claims still accurate
- [ ] Site still loads with JavaScript disabled
