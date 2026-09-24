# Phase 2: Search engine setup and brand authority

The code-side work is done in this repo. The steps below need **your** Google/Microsoft accounts and can't be done from code.

Site URL: `https://therightlifestyle.github.io/TRL-TheRightLifestyle/`

## 1. Google Search Console (~10 min)
1. Go to https://search.google.com/search-console and click **Add property**.
2. Choose **URL prefix** (not Domain, because you don't own `github.io`) and paste the site URL above.
3. Pick the **HTML tag** method and copy only the `content="..."` value.
4. Put it in `tools/seo.config.json` → `"google": "PASTE_HERE"`, then run:
   ```
   python3 tools/seo.py build && python3 tools/seo.py check
   ```
   Commit and push. Wait for GitHub Pages to deploy (1–2 min), then click **Verify**.
5. **Sitemaps** → submit `sitemap.xml`.
6. **URL inspection** → inspect the home page and `services.html` → **Request indexing**.

Keep the tag in place permanently. Removing it un-verifies the property.

## 2. Bing Webmaster Tools (~5 min, also powers DuckDuckGo, Yahoo, and ChatGPT search)
Easiest: https://www.bing.com/webmasters → **Import from Google Search Console** (after step 1).
Or use the meta tag: put the `msvalidate.01` value in `"bing"` and rebuild the same way. Then submit the sitemap.

## 3. Verify structured data
- https://search.google.com/test/rich-results (enter each page URL)
- https://validator.schema.org (catches issues the Google tool ignores)
Locally and in CI: `python3 tools/seo.py check`.

Note: Google now shows FAQ rich results mostly for government and health sites, so don't expect FAQ dropdowns in Google results. The markup still helps Bing and AI answer engines understand the page.

## 4. Brand authority (do over the next weeks)
Search engines trust an entity when the **same name, description and links** show up everywhere.
- **Google Business Profile** (https://business.google.com): "The Right Lifestyle (TRL)", service-area business, Rawalpindi. Biggest single win for local brand searches.
- **LinkedIn company page + Rashid's personal profile**, both linking to the site. Then add those URLs to `sameAs` in the Organization/Person JSON-LD.
- Use one consistent description everywhere:
  > The Right Lifestyle (TRL) is a founder-led AI systems company in Rawalpindi, Pakistan, building custom AI automation, agents and business operating systems.
- Link Instagram bio and GitHub profile to the site URL (both already in `sameAs`).
- Longer term: a custom domain (e.g. `therightlifestyle.com`) lets you use a Domain property, email on your own domain, and builds more trust than a `github.io` subpath. If you move, keep the GitHub Pages site redirecting.

## Maintenance rules
- Edited an FAQ? Run `python3 tools/seo.py build`. CI fails if markup and visible text drift apart.
- Added a page? Add it to `sitemap.xml` and give it canonical, og:url, description and the standard JSON-LD graph. CI enforces this.
