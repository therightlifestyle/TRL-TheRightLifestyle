# TRL — The Right Lifestyle

> **AI systems that give business owners their time back.**

[![Live Site](https://img.shields.io/badge/Live-TRL_Website-2563EB?style=for-the-badge)](https://therightlifestyle.github.io/TRL-TheRightLifestyle/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Chat_Direct-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/923190091457)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Static](https://img.shields.io/badge/Stack-Static_HTML_CSS_JS-success?style=for-the-badge)](https://pages.github.com/)

TRL builds **custom AI automation, agents and operating systems** for businesses. We remove repetitive work — lead response, follow-ups, data entry, internal operations — so owners can focus on the work only humans can do.

- 📍 **Rawalpindi, Pakistan** — delivering worldwide
- 👤 **Founder-led by Rashid Muhammad** (the person you talk to builds the system)
- 🚫 **No** fake testimonials, fabricated metrics, AI hype or lock-in
- ✅ **Written scope, fixed price, on-time guarantee** on every build

---

## The website

This repository is the TRL marketing website — a dependency-free static site:

```
index.html       Home (hero, capabilities, tiers, founder, FAQ)
services.html    AI automation, agents, workflows, consulting, BOS
how.html         5-step process: audit → scope → build → launch → handover
about.html       Mission, values, founder profile, status
pricing.html     Core tiers and add-ons (USD + PKR)
contact.html     WhatsApp, email, 30-second project brief builder
privacy.html     Privacy disclosure (almost nothing collected)
404.html         On-brand not-found
style.css        Design system (dark/light themes, glass cards, motion)
app.js           Interaction layer (zero dependencies, zero trackers)
assets/          Icons and social cover
```

**Stack:** vanilla HTML, CSS and JavaScript. No build step, no npm, no framework, no backend. Deployable to any static host.

## What TRL builds

| Capability | What it does |
|---|---|
| **AI Automation** | End-to-end workflows that replace repetitive manual work |
| **Custom AI Agents** | Agents trained on your business — support, qualification, booking, internal ops |
| **Workflow Automation** | Connect your tools (CRM, email, WhatsApp, sheets, calendar) via APIs and webhooks |
| **Lead & Customer Response** | Capture, qualify, route and follow up on every lead 24/7 across channels |
| **AI Consulting** | Practical guidance on what to automate, what tools to use and what to ignore |
| **Business Operating Systems** | Full-stack infrastructure across sales, ops and reporting for scaling teams |

## Pricing

| Offer | Starting at | Best for |
|---|---|---|
| Workflow Audit | **$35 / PKR 9,900** | See exactly what to automate first |
| Starter Build | **$299 / PKR 84,000** | First AI workflow or agent (1–3 days) |
| Growth OS | **$799 / PKR 224,000** | Up to 4 automations + CRM (3–7 days) |
| Premium Scale | **$1,999 / PKR 560,000** | Full multi-channel operating system (7–14 days) |

Every scope confirmed in writing before work starts. On-time or refunded.

## Contact

- **WhatsApp (fastest):** [+92 319 0091457](https://wa.me/923190091457) — avg reply ~1 hour (PKT)
- **Email:** [officialtrlservice@gmail.com](mailto:officialtrlservice@gmail.com)
- **Instagram:** [@the.right.lifestyle](https://instagram.com/the.right.lifestyle)
- **Brief builder:** On the [contact page](https://therightlifestyle.github.io/TRL-TheRightLifestyle/contact.html#brief) — builds a clean WhatsApp message, no data leaves your browser until you press send

## Tech principles

- **Zero dependencies.** No framework, no npm, no build step. Open `index.html` in a browser and it works.
- **Zero trackers.** No Google Analytics, no Facebook Pixel, no cookies. Two `localStorage` values for theme + currency preference.
- **Progressive enhancement.** Every page works with JavaScript disabled.
- **Reduced-motion respected.** All animations disabled for users who prefer it.
- **Honest by default.** No fabricated social proof, no fake metrics, no claims about work that hasn't shipped.

## Deploy & hosting

Served from the `main` branch via **GitHub Pages** at:

```
https://therightlifestyle.github.io/TRL-TheRightLifestyle/
```

`.nojekyll` is included to serve assets as-is. When a custom domain is purchased, switch the canonical URLs, CNAME and GitHub Pages custom-domain setting — no rebuild required.

### Quickstart (local)

```bash
# Any static server works, e.g.:
python3 -m http.server 8080
# then open http://localhost:8080
```

## License

MIT — see [LICENSE](LICENSE).
