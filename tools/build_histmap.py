"""Build the History Map data from Cliopatria.

    python3 tools/build_histmap.py path/to/cliopatria.geojson

Cliopatria (Seshat Global History Databank, CC BY 4.0) gives the borders of about 1,600 states and empires
from 3400 BCE to 2024 CE: https://github.com/Seshat-Global-History-Databank/cliopatria
This script projects the borders into the Natural Earth projection used by the Atlas (1000 x 520 units),
simplifies them, and writes them as small chunks by period, loaded only when needed:

  data/hm/map.js        the snapshot years, the chunk list and the table of state names (for search)
  data/hm/hm-HASH.js    the borders, labels and areas for one period

Changes from the original: borders simplified to about 0.7 map units (roughly 25 km), tiny islands dropped.
Needs the shapely package (pip install shapely). Run tools/build.py afterwards.
"""
import hashlib, json, math, os, sys
from shapely.geometry import Polygon
from shapely.ops import polylabel
from shapely.validation import make_valid

TOL = 0.7
CHUNK = 420_000  # target size of one chunk in characters
K = 182.78964407016807


def proj(lo, la):
    p = math.radians(max(-89.99, min(89.99, la))); l = math.radians(lo); p2 = p * p; p4 = p2 * p2
    return (500 + K * l * (.8707 - .131979 * p2 + p4 * (-.013791 + p4 * p2 * (.003971 - .001529 * p2))),
            260 - K * p * (1.007226 + p2 * (.015085 + p4 * (-.044475 + .028874 * p2 - .005916 * p4))))


def ring(r):
    return [proj(c[0], c[1]) for c in r]


def to_path(geom):
    parts = [geom] if geom.geom_type == "Polygon" else [g for g in getattr(geom, "geoms", []) if g.geom_type == "Polygon"]
    if not parts:
        return None, None, None
    big = max(parts, key=lambda g: g.area)
    out = []
    for P in parts:
        if P.area < max(.25, TOL * TOL) and P is not big:
            continue
        for rg in [P.exterior, *P.interiors]:
            pts, last = [], None
            for x, y in rg.coords[:-1]:
                c = (round(x * 10), round(y * 10))
                if c != last:
                    pts.append(c); last = c
            if len(pts) < 3:
                continue
            out.append("M%d %d" % pts[0] + "l" + " ".join("%d %d" % (pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]) for i in range(1, len(pts))) + "z")
    return "".join(out) or None, big, geom.bounds


def main(src):
    feats = json.load(open(src, encoding="utf-8"))["features"]
    recs = []
    for f in feats:
        p, g = f["properties"], f["geometry"]
        polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
        G = None
        for poly in polys:
            P = Polygon(ring(poly[0]), [ring(h) for h in poly[1:]])
            if not P.is_valid:
                P = make_valid(P)
            G = P if G is None else G.union(P)
        if G is None:
            continue
        path, big, bb = to_path(G.simplify(TOL, preserve_topology=True))
        if not path:
            continue
        try:
            lp = polylabel(big, tolerance=.5)
        except Exception:
            lp = big.representative_point()
        recs.append(dict(n=p["Name"], a=p["FromYear"], b=p["ToYear"], ar=round(p["Area"]), rel=p["Type"] == "RELATION",
                         w=p.get("Wikipedia") or "", m=p.get("MemberOf") or "", path=path,
                         lab=(round(lp.x, 1), round(lp.y, 1)), bb=[round(v, 1) for v in bb]))
    # table of names
    names, idx = [], {}
    for r in sorted(recs, key=lambda r: (r["a"], r["n"])):
        if r["n"] not in idx:
            idx[r["n"]] = len(names); names.append([r["n"], r["w"], 1 if r["rel"] else 0, r["a"], r["b"], r["a"], r["ar"]])
        t = names[idx[r["n"]]]
        t[3] = min(t[3], r["a"]); t[4] = max(t[4], r["b"])
        if r["ar"] > t[6]:
            t[5], t[6] = r["a"], r["ar"]
    years = sorted({r["a"] for r in recs})
    # chunk boundaries balanced by size
    size_at = {}
    for r in recs:
        size_at[r["a"]] = size_at.get(r["a"], 0) + len(r["path"]) + 60
    bounds, acc, start = [], 0, years[0]
    for i, y in enumerate(years):
        acc += size_at[y]
        if acc >= CHUNK and i < len(years) - 1:
            bounds.append((start, years[i + 1] - 1)); start = years[i + 1]; acc = 0
    bounds.append((start, 9999))
    os.makedirs("data/hm", exist_ok=True)
    for fn in os.listdir("data/hm"):
        os.remove(os.path.join("data/hm", fn))
    files = []
    for lo, hi in bounds:
        geo, gi, rows = [], {}, []
        for r in recs:
            if r["a"] <= hi and r["b"] >= lo:
                if r["path"] not in gi:
                    gi[r["path"]] = len(geo); geo.append(r["path"])
                rows.append([idx[r["n"]], r["a"], r["b"], r["ar"], idx.get(r["m"], -1), *r["lab"], *r["bb"], gi[r["path"]]])
        body = json.dumps({"lo": lo, "hi": hi, "r": rows, "g": geo}, separators=(",", ":"), ensure_ascii=False)
        h = hashlib.sha1(body.encode()).hexdigest()[:8]
        name = f"hm-{h}"
        with open(f"data/hm/{name}.js", "w", encoding="utf-8") as fh:
            fh.write("// Generated by tools/build_histmap.py from Cliopatria (Seshat, CC BY 4.0). Do not edit.\nHMAP.add(" + body + ");\n")
        files.append([name, lo, hi])
    with open("data/hm/map.js", "w", encoding="utf-8") as fh:
        fh.write("// Generated by tools/build_histmap.py. History Map: snapshot years, chunks [file, from, to] and names\n"
                 "// [name, Wikipedia title, is a union of states, first year, last year, year of largest extent, largest area km²].\n"
                 "window.HMAPIDX=" + json.dumps({"years": years, "files": files, "names": names}, separators=(",", ":"), ensure_ascii=False) + ";\n")
    print(len(recs), "records,", len(names), "names,", len(files), "chunks")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "cliopatria.geojson")
