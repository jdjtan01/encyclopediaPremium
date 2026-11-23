"""Check the reference links before a release.

    python tools/check_refs.py            # full check (needs internet access)
    python tools/check_refs.py --offline  # format checks only, no internet

What it does:
  1. Collects every reference link (["Title","https://..."]) in the data folder.
  2. Offline checks: links that are not https, malformed addresses, spaces,
     the same link listed twice for one article, and titles that are empty.
  3. Online check: asks each address for its page (8 at a time) and reports
     links that are broken (404, 410, server errors, no answer) or that now
     redirect to a site's home page, which usually means the page was removed.
     Sites that refuse automated checks (403, 429) are listed separately so you
     can open them in a browser yourself.
  4. Writes tools/refs-report.csv with one row per problem.

Run it from the folder that contains index.html.
"""
import csv, glob, re, sys, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

PAIR = re.compile(r'\[\s*"((?:[^"\\]|\\.)*)"\s*,\s*"(https?://[^"]*)"\s*\]')
KEY = re.compile(r'(?<![\w/])"?([A-Za-z0-9_]+)"?\s*:\s*\[')
SKIP = re.compile(r"data/(images|wiki|b/|ex/)")
UA = "Mozilla/5.0 (EncyclopediaPremium reference check; personal project)"


def collect():
    links = []  # (file, line, title, url)
    for f in sorted(glob.glob("data/**/*.js", recursive=True)):
        if SKIP.search(f.replace("\\", "/")):
            continue
        text = open(f, encoding="utf-8").read()
        keys = [(m.start(), m.group(1)) for m in KEY.finditer(text)]
        for m in PAIR.finditer(text):
            k = ""
            for pos, name in keys:
                if pos > m.start():
                    break
                k = name
            links.append((f, text.count("\n", 0, m.start()) + 1, k, m.group(1), m.group(2)))
    return links


def offline(links):
    out, seen = [], {}
    for f, n, k, t, u in links:
        p = urllib.parse.urlparse(u)
        if not t.strip():
            out.append((f, n, k, u, "empty title"))
        if p.scheme != "https":
            out.append((f, n, k, u, "not https"))
        if not p.netloc or " " in u or u != u.strip():
            out.append((f, n, k, u, "malformed address"))
        if k:
            if (k, u) in seen:
                out.append((f, n, k, u, "listed twice for this article"))
            seen[(k, u)] = 1
    return out


def fetch(u):
    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(u, method=method, headers={"User-Agent": UA})
            r = urllib.request.urlopen(req, timeout=25)
            return r.status, r.geturl()
        except urllib.error.HTTPError as e:
            if method == "HEAD" and e.code in (400, 403, 405, 501):
                continue
            return e.code, u
        except Exception as e:
            if method == "HEAD":
                continue
            return 0, str(e)[:80]
    return 0, "no answer"


def online(links):
    urls = sorted({l[4] for l in links})
    print(f"Checking {len(urls)} addresses…")
    with ThreadPoolExecutor(8) as ex:
        res = dict(zip(urls, ex.map(fetch, urls)))
    out = []
    for f, n, k, t, u in links:
        code, final = res[u]
        if code in (403, 429):
            out.append((f, n, k, u, f"site refused the check ({code}); open it in a browser"))
        elif code == 0 or code >= 400:
            out.append((f, n, k, u, f"broken ({code or final})"))
        elif urllib.parse.urlparse(final).path in ("", "/") and urllib.parse.urlparse(u).path not in ("", "/"):
            out.append((f, n, k, u, f"redirects to the home page ({final})"))
    return out


def main():
    links = collect()
    print(f"{len(links)} reference links in {len({l[0] for l in links})} files, {len({l[4] for l in links})} different addresses.")
    probs = offline(links)
    if "--offline" not in sys.argv:
        probs += online(links)
    with open("tools/refs-report.csv", "w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        w.writerow(["file", "line", "article", "address", "problem"])
        w.writerows(probs)
    for p in probs:
        print(f"{p[0]}:{p[1]}  {p[2]}  {p[4]}\n    {p[3]}")
    print(f"\n{len(probs)} problem(s). Details in tools/refs-report.csv." if probs else "\nNo problems found.")


if __name__ == "__main__":
    main()
