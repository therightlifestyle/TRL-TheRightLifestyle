#!/usr/bin/env python3
"""TRL SEO tooling (stdlib only).

  python3 tools/seo.py build   # sync FAQPage JSON-LD + verification meta tags into pages
  python3 tools/seo.py check   # validate SEO signals; exits 1 on any error (used in CI)

Verification tokens live in tools/seo.config.json. Empty tokens are skipped,
so no placeholder tags are ever published.
"""
import glob, html, json, os, re, sys
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://therightlifestyle.github.io/TRL-TheRightLifestyle/"
ORG_NAME, ORG_ALT = "The Right Lifestyle", ["TRL", "TRL — The Right Lifestyle"]
SITE_NAME = "The Right Lifestyle (TRL)"
NOINDEX = {"404.html", "founder.html"}
LD_RE = re.compile(r'<script type="application/ld\+json"( data-seo="faq")?>(.*?)</script>', re.S)
FAQ_RE = re.compile(r'<button class="faq-q"[^>]*>(.*?)<span.*?</button>\s*<div class="faq-a"[^>]*><div>(.*?)</div></div>', re.S)
VERIFY = {"google": "google-site-verification", "bing": "msvalidate.01", "yandex": "yandex-verification"}


def text(fragment):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", fragment))).strip()


def url_for(page):
    return BASE if page == "index.html" else BASE + page


def pages():
    return sorted(os.path.basename(p) for p in glob.glob(os.path.join(ROOT, "*.html")))


def build():
    cfg = json.load(open(os.path.join(ROOT, "tools", "seo.config.json")))
    for page in pages():
        path = os.path.join(ROOT, page)
        src = open(path, encoding="utf-8").read()
        out = re.sub(r'<script type="application/ld\+json" data-seo="faq">.*?</script>\n', "", src, flags=re.S)
        out = re.sub(r'\n?<meta name="(%s)"[^>]*/>' % "|".join(map(re.escape, VERIFY.values())), "", out)
        faqs = FAQ_RE.findall(out)
        if faqs and page not in NOINDEX:
            data = {"@context": "https://schema.org", "@type": "FAQPage", "@id": url_for(page) + "#faq",
                    "mainEntity": [{"@type": "Question", "name": text(q),
                                    "acceptedAnswer": {"@type": "Answer", "text": text(a)}} for q, a in faqs]}
            tag = '<script type="application/ld+json" data-seo="faq">%s</script>\n' % json.dumps(data, ensure_ascii=False, separators=(",", ":"))
            out = out.replace("</head>", tag + "</head>", 1)
        if page == "index.html":
            metas = "".join('\n<meta name="%s" content="%s" />' % (VERIFY[k], html.escape(v))
                            for k, v in cfg.get("verification", {}).items() if v and k in VERIFY)
            out = re.sub(r"(<meta charset=[^>]*>)", lambda m: m.group(1) + metas, out, count=1)
        if out != src:
            open(path, "w", encoding="utf-8").write(out)
            print("updated", page)


def check():
    errors, warns = [], []
    ids_defined, ids_used = set(), set()

    def walk(node, top=False):
        if isinstance(node, dict):
            if "@id" in node:
                (ids_defined if top or len(node) > 1 else ids_used).add(node["@id"])
            for v in node.values():
                walk(v)
        elif isinstance(node, list):
            for v in node:
                walk(v)

    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemap = {e.text.strip() for e in ET.parse(os.path.join(ROOT, "sitemap.xml")).getroot().findall("s:url/s:loc", ns)}
    robots = open(os.path.join(ROOT, "robots.txt")).read()
    if BASE + "sitemap.xml" not in robots:
        errors.append("robots.txt: Sitemap line missing or wrong")

    for page in pages():
        src = open(os.path.join(ROOT, page), encoding="utf-8").read()
        p = lambda m: errors.append(f"{page}: {m}")
        titles = re.findall(r"<title>(.*?)</title>", src, re.S)
        if len(titles) != 1:
            p("expected exactly one <title>")
        if page in NOINDEX:
            if url_for(page) in sitemap:
                p("noindex/blocked page is listed in sitemap")
            continue
        url = url_for(page)
        canon = re.search(r'<link rel="canonical" href="([^"]+)"', src)
        if not canon or canon.group(1) != url:
            p(f"canonical should be {url}")
        og = re.search(r'property="og:url" content="([^"]+)"', src)
        if not og or og.group(1) != url:
            p("og:url missing or mismatched")
        if not re.search(r'<meta name="description" content="[^"]{50,}"', src):
            p("meta description missing or too short")
        if url not in sitemap:
            p("not listed in sitemap.xml")
        if "noindex" in src:
            p("indexable page contains noindex")
        types = []
        for _, block in LD_RE.findall(src):
            try:
                data = json.loads(block)
            except ValueError as e:
                p(f"invalid JSON-LD: {e}")
                continue
            for node in data.get("@graph", [data]):
                types.append(node.get("@type"))
                if node.get("@type") == "Organization" and (node.get("name"), node.get("alternateName")) != (ORG_NAME, ORG_ALT):
                    p("Organization name/alternateName inconsistent with canonical entity")
                if node.get("@type") == "WebSite" and node.get("name") != SITE_NAME:
                    p(f"WebSite name should be {SITE_NAME!r}")
                if "potentialAction" in node:
                    p("potentialAction/SearchAction present but the site has no search")
                walk(node, top=True)
        for req in ("Organization", "WebSite", "WebPage"):
            if req not in types:
                p(f"JSON-LD missing {req}")
        visible = [(text(q), text(a)) for q, a in FAQ_RE.findall(src)]
        if visible:
            faq = [json.loads(b) for f, b in LD_RE.findall(src) if f]
            marked = [(e["name"], e["acceptedAnswer"]["text"]) for e in faq[0]["mainEntity"]] if faq else []
            if marked != visible:
                p("FAQPage JSON-LD out of sync with visible FAQ (run: python3 tools/seo.py build)")
        if 'rel="noopener"' not in src and 'target="_blank"' in src:
            warns.append(f"{page}: target=_blank links without rel=noopener")

    for u in sitemap:
        page = "index.html" if u == BASE else u.replace(BASE, "")
        if not os.path.exists(os.path.join(ROOT, page)):
            errors.append(f"sitemap.xml: {u} has no file")
    for missing in sorted(ids_used - ids_defined):
        if not missing.endswith("#faq"):
            warns.append(f"@id referenced but never defined on its own page set: {missing}")

    for w in warns:
        print("WARN ", w)
    for e in errors:
        print("ERROR", e)
    print(f"{len(pages())} pages checked, {len(errors)} errors, {len(warns)} warnings")
    return 1 if errors else 0


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "check"
    sys.exit(build() if cmd == "build" else check())
