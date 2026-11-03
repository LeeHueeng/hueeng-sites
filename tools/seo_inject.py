#!/usr/bin/env python3
"""Inject brand SEO/GEO signals into a static HTML page (idempotent).

usage: seo_inject.py FILE --url URL --site-name NAME [--description D] [--app-name N --ios ID --android PKG]
        [--og-image URL] [--type website|article] [--index]
Adds (only when missing): canonical, description, author/publisher meta, Open Graph, twitter card,
Organization+WebSite(+MobileApplication) JSON-LD naming 후엥(Hueeng) as publisher, and turns the
business-info footer trade name into a link back to hueeng.com.
"""
import argparse, json, re, sys
from pathlib import Path

ORG = {
    "@type": "Organization", "@id": "https://hueeng.com/#organization",
    "name": "후엥", "alternateName": ["Hueeng", "후엥컴퍼니", "Hueeng Company"],
    "url": "https://hueeng.com", "email": "hi@hueeng.com",
    "founder": {"@type": "Person", "name": "이현우", "alternateName": ["Hyeonu Lee", "LeeHueeng"]},
    "address": {"@type": "PostalAddress", "streetAddress": "신림동 412-109 B01호", "addressLocality": "관악구", "addressRegion": "서울특별시", "addressCountry": "KR"},
    "vatID": "474-26-01971",
    "sameAs": ["https://github.com/LeeHueeng", "https://apps.apple.com/kr/developer/id1858238879", "https://play.google.com/store/apps/developer?id=Hueeng"],
}

def main():
    p = argparse.ArgumentParser(); p.add_argument('file'); p.add_argument('--url', required=True); p.add_argument('--site-name', required=True)
    p.add_argument('--description'); p.add_argument('--app-name'); p.add_argument('--ios'); p.add_argument('--android'); p.add_argument('--og-image')
    p.add_argument('--type', default='website'); p.add_argument('--index', action='store_true', help='also add robots index,follow')
    a = p.parse_args()
    path = Path(a.file); s = path.read_text(encoding='utf-8'); orig = s
    head_end = s.lower().find('</head>')
    if head_end < 0: print('no </head>', path); return 1
    head = s[:head_end]
    desc = a.description
    if not desc:
        m = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)', head, re.I)
        desc = m.group(1) if m else ''
    tm = re.search(r'<title>(.*?)</title>', head, re.S | re.I); title = (tm.group(1).strip() if tm else a.site_name)
    add = []
    def missing(pattern): return re.search(pattern, head, re.I) is None
    if desc and missing(r'name=["\']description["\']'): add.append(f'<meta name="description" content="{desc}">')
    if missing(r'rel=["\']canonical["\']'): add.append(f'<link rel="canonical" href="{a.url}">')
    if missing(r'name=["\']author["\']'): add.append('<meta name="author" content="후엥(Hueeng) · 이현우">')
    if missing(r'name=["\']publisher["\']'): add.append('<meta name="publisher" content="후엥(Hueeng) hueeng.com">')
    if a.index and missing(r'name=["\']robots["\']'): add.append('<meta name="robots" content="index,follow,max-image-preview:large">')
    if missing(r'property=["\']og:title["\']'):
        add += [f'<meta property="og:locale" content="ko_KR">', f'<meta property="og:type" content="{a.type}">', f'<meta property="og:site_name" content="{a.site_name} · 후엥(Hueeng)">',
                f'<meta property="og:title" content="{title}">', f'<meta property="og:description" content="{desc}">', f'<meta property="og:url" content="{a.url}">']
        if a.og_image: add.append(f'<meta property="og:image" content="{a.og_image}">')
        add.append('<meta name="twitter:card" content="%s">' % ('summary_large_image' if a.og_image else 'summary'))
    elif missing(r'property=["\']og:site_name["\']'):
        add.append(f'<meta property="og:site_name" content="{a.site_name} · 후엥(Hueeng)">')
    if 'hueeng.com/#organization' not in s:
        graph = [ORG, {"@type": "WebSite", "@id": a.url.rstrip('/') + '/#website', "url": a.url, "name": a.site_name, "inLanguage": "ko-KR",
                       "publisher": {"@id": ORG["@id"]}, "description": desc}]
        if a.app_name:
            app = {"@type": "MobileApplication", "name": a.app_name, "url": a.url, "applicationCategory": "UtilitiesApplication",
                   "author": {"@id": ORG["@id"]}, "publisher": {"@id": ORG["@id"]}, "offers": {"@type": "Offer", "price": "0", "priceCurrency": "KRW"},
                   "operatingSystem": ", ".join(x for x, ok in (("iOS", a.ios), ("Android", a.android)) if ok)}
            same = []
            if a.ios: same.append(f'https://apps.apple.com/kr/app/id{a.ios}')
            if a.android: same.append(f'https://play.google.com/store/apps/details?id={a.android}')
            if same: app["sameAs"] = same
            if desc: app["description"] = desc
            graph.append(app)
        add.append('<script type="application/ld+json">' + json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False) + '</script>')
    if add:
        s = s[:head_end] + ''.join(add) + '\n' + s[head_end:]
    # backlink to hueeng.com from the business-info line (first occurrence only)
    s = s.replace('상호 후엥(Hueeng)', '상호 <a href="https://hueeng.com" rel="me">후엥(Hueeng)</a>', 1) if '상호 후엥(Hueeng)' in s and 'href="https://hueeng.com"' not in s else s
    if s != orig:
        path.write_text(s, encoding='utf-8'); print('patched', path, f'({len(add)} head tags)')
    else:
        print('unchanged', path)
    return 0

if __name__ == '__main__':
    sys.exit(main())
