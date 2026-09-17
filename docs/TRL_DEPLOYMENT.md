# TRL — Deployment

**Verified live:** 2026-09-17 via GitHub Pages API

---

## 1. Configuration

| Setting | Value |
|---|---|
| Live URL | https://therightlifestyle.github.io/TRL-TheRightLifestyle/ |
| Status | `built` |
| Source | branch `main`, path `/` (root) |
| Build type | `legacy` (no Actions workflow) |
| HTTPS | enforced |
| Custom domain | none (`cname: null`) |
| Custom 404 | yes — `404.html` |

---

## 2. How a deploy happens

```
git push origin main  ──►  GitHub Pages rebuild (~1 min)  ──►  live
```

That is the entire pipeline. No build, no CI, no secrets, no manual step.

**Therefore: `main` is production.** Any commit that lands on `main` is public
within about a minute. There is no staging environment and no approval gate
between merge and live.

---

## 3. Standard change flow

1. Branch from `main`.
2. Make the change; run the local preview (§4).
3. Verify the checklist (§5).
4. Open a PR against `main`.
5. Merge → live in ~1 minute.
6. Confirm the live URL, hard-refreshed.

---

## 4. Local preview

No build, so any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

What you see locally is exactly what Pages serves — same files, no transform.

---

## 5. Pre-deploy checklist

- [ ] All four pages load: `index.html`, `about.html`, `privacy.html`, `404.html`
- [ ] Mobile nav opens, closes on link click, `aria-expanded` toggles
- [ ] Quote helper renders a correct `wa.me` link
- [ ] Page is readable and navigable with JavaScript disabled
- [ ] No console errors
- [ ] Relative asset paths only — the site lives under a `/TRL-TheRightLifestyle/`
      subpath, so a leading-slash path like `/style.css` **will 404 in production**
      while appearing fine at a local server root. This is the single most likely
      way to break the deploy.
- [ ] New pages added to `sitemap.xml`
- [ ] `TRL_CHANGELOG.md` updated

---

## 6. Rollback

Pages always serves the current `main`. To roll back, move `main` back.

**Preferred — revert forward (keeps history honest):**
```bash
git revert <bad-commit>
git push origin main
```

**For a merged PR:**
```bash
gh pr revert <pr-number>   # or use the Revert button on the PR
```

Recovery time is one rebuild, roughly a minute. Avoid force-pushing `main`;
a revert commit is auditable and a rewritten history is not.

---

## 7. Adding a custom domain later

All four must change together or the site breaks SEO and canonical links:

1. Settings → Pages → Custom domain.
2. Create a `CNAME` file containing the domain.
3. DNS: `A` records to GitHub's IPs, or `CNAME` for `www`.
4. Update `<link rel="canonical">` in every page, plus `sitemap.xml` and `robots.txt`.

Then wait for the certificate to issue and re-enable HTTPS enforcement.

---

## 8. Failure modes

| Symptom | Likely cause |
|---|---|
| 404 on the whole site | Pages source changed, or `index.html` missing from root |
| Page loads, no styling | Absolute asset path — must be relative (see §5) |
| Change not appearing | Rebuild still running, or browser cache — hard refresh |
| Build shows `errored` | Malformed file at root, or a stray Jekyll-hostile filename (leading underscore) |
| Custom 404 not served | `404.html` missing from repo root |
