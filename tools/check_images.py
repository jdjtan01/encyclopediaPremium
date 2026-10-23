"""Run this on your own computer (it needs internet access to Wikipedia).

    python tools/check_images.py

What it does:
  1. Checks that every Commons file name listed by hand in data/images.js, images2.js
     and images3.js still exists.
  2. Looks up the lead image of the Wikipedia page each article points to in
     data/wiki.js, and reports pages that are missing or whose lead image is a
     flag, map or logo (pick a better page title for those in data/wiki.js).
  3. Writes data/images-auto.js, which pins those lead images as file names so
     photos appear immediately without a lookup in the browser.

Entries you add by hand to data/images.js always take priority over images-auto.js.
"""
import glob, json, re, time, urllib.parse, urllib.request

WP = "https://en.wikipedia.org/w/api.php"
CM = "https://commons.wikimedia.org/w/api.php"
BAD = re.compile(r"(^|[ _\-(,])(flag|map|locator|logo|seal|blank|icon)([ _\-.,)]|$)|coat[ _]of[ _]arms|location|orthographic|projection|signature", re.I)

def api(url, **p):
    p["format"] = "json"
    req = urllib.request.Request(url + "?" + urllib.parse.urlencode(p),
                                 headers={"User-Agent": "EncyclopediaPremium/1.1 (personal project)"})
    time.sleep(0.3)
    return json.load(urllib.request.urlopen(req, timeout=30))

def read(pattern):
    return "\n".join(open(f, encoding="utf-8").read() for f in sorted(glob.glob(pattern)))

titles = dict(re.findall(r'\{id:"(\w+)",t:"([^"]+)"', read("data/articles-*.js") + open("index.html", encoding="utf-8").read()))
wiki = dict(re.findall(r'(\w+):"([^"]+)"', open("data/wiki.js", encoding="utf-8").read()))
manual = {}
for f in sorted(glob.glob("data/images*.js")):
    if not f.endswith("images-auto.js"):
        manual.update(re.findall(r'(\w+):"([^"]+\.(?:jpe?g|png|svg|gif|tiff?))"', open(f, encoding="utf-8").read(), re.I))

print("Checking", len(manual), "hand-picked Commons files...")
names = list(manual.values())
for k in range(0, len(names), 50):
    pages = api(CM, action="query", titles="|".join("File:" + n for n in names[k:k + 50]), prop="imageinfo")["query"]["pages"]
    for p in pages.values():
        if "missing" in p and "imageinfo" not in p:
            ids = [i for i, n in manual.items() if "File:" + n.replace("_", " ") == p["title"].replace("_", " ")]
            print("  MISSING", p["title"], "used by", ", ".join(ids) or "?")

print("Looking up Wikipedia lead images for", len(titles), "articles...")
auto, want = {}, {i: wiki.get(i) or re.sub(r"^(The|A|An) ", "", t) for i, t in titles.items()}
items = list(want.items())
for k in range(0, len(items), 45):
    chunk = items[k:k + 45]
    q = api(WP, action="query", prop="pageimages", piprop="name", pilimit=50, redirects=1,
            titles="|".join(t for _, t in chunk))["query"]
    to = {t: t for _, t in chunk}
    for n in q.get("normalized", []) + q.get("redirects", []):
        for t in to:
            if to[t] == n["from"]:
                to[t] = n["to"]
    pages = {p["title"]: p for p in q.get("pages", {}).values()}
    for i, t in chunk:
        p = pages.get(to[t], {})
        if "missing" in p or not p:
            print("  NO PAGE    ", i, "->", t)
        elif "pageimage" not in p:
            print("  NO IMAGE   ", i, "->", t)
        elif BAD.search(p["pageimage"]):
            print("  FLAG/MAP?  ", i, "->", t, ":", p["pageimage"])
        else:
            auto[i] = p["pageimage"].replace("_", " ")

body = ",\n".join("%s:%s" % (k, json.dumps(v, ensure_ascii=False)) for k, v in sorted(auto.items()))
open("data/images-auto.js", "w", encoding="utf-8").write(
    "// Written by tools/check_images.py from Wikipedia lead images. Hand-picked entries in images.js win.\n"
    "window.IMG=Object.assign(window.IMG||{},{\n" + body + "});\n")
print("Wrote data/images-auto.js with", len(auto), "entries")
