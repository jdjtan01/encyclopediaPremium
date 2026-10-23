"""Run this on your own computer (it needs internet access to Wikimedia Commons).

    python tools/check_images.py

It reads the article titles and the file names in data/images*.js, checks that each
file exists on Wikimedia Commons, and searches for a replacement when one is missing.
It also searches for a photo for every article that has none. Results are written to
data/images-auto.js. Review that file: automatic picks can be wrong, and any entry you
add by hand to data/images.js takes priority over it.
"""
import glob, json, re, time, urllib.parse, urllib.request

API = "https://commons.wikimedia.org/w/api.php"
SKIP = re.compile(r"map|logo|flag|icon|diagram|coat of arms|stamp|signature", re.I)

def api(**p):
    p["format"] = "json"
    req = urllib.request.Request(API + "?" + urllib.parse.urlencode(p),
                                 headers={"User-Agent": "EncyclopediaPremium/1.0 (personal project)"})
    time.sleep(0.3)
    return json.load(urllib.request.urlopen(req, timeout=30))

def exists(name):
    pages = api(action="query", titles="File:" + name, prop="imageinfo")["query"]["pages"]
    return "-1" not in pages

def find(query):
    hits = api(action="query", list="search", srnamespace=6, srsearch=query, srlimit=10)["query"]["search"]
    for h in hits:
        name = h["title"][5:]
        if re.search(r"\.(jpe?g|png)$", name, re.I) and not SKIP.search(name):
            return name

titles = {}
for f in glob.glob("data/articles-*.js"):
    for i, t in re.findall(r'\{id:"(\w+)",t:"([^"]+)"', open(f, encoding="utf-8").read()):
        titles[i] = t

current = {}
for f in sorted(glob.glob("data/images*.js")):
    if f.endswith("images-auto.js"):
        continue
    current.update(re.findall(r'(\w+):"([^"]+\.(?:jpe?g|png|svg))"', open(f, encoding="utf-8").read()))

auto = {}
for i, t in titles.items():
    name = current.get(i)
    if name and exists(name):
        continue
    pick = find(t)
    if pick:
        auto[i] = pick
        print(("fixed   " if name else "added   ") + i, "->", pick)
    else:
        print("no match", i)

body = ",\n".join('%s:%s' % (k, json.dumps(v, ensure_ascii=False)) for k, v in auto.items())
open("data/images-auto.js", "w", encoding="utf-8").write(
    "window.IMG=Object.assign(window.IMG||{},{\n" + body + "});\n")
print("Wrote data/images-auto.js with", len(auto), "entries")
