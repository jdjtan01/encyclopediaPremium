# Encyclopedia Premium: working notes

Encyclopedia Premium is a static, offline, neutral, **general** encyclopedia for a worldwide audience.
Live site: https://jdjtan01.github.io/encyclopediaPremium/

## Content rules

- **Write for a general reader. Do not bias content toward any one country.**
  - Do not add a Philippine angle (or any country's angle) by default.
  - Mention a country only when it is genuinely central to the topic, for example an article about that country, a place in it or a person from it.
- Every new or updated article needs:
  - a picture example (EX), checked in light, dark and phone views;
  - references, link phrases (LINKS) and backlinks from related articles;
  - placement in a subject section (data/subjects.js).
- Do not add Tagalog or other translated summaries; the site is English only.
- Add Today in History events where accurate, and check for existing entries on the same date first.
- Web-search any fact that can change over time, such as populations, leaders, records and ongoing projects.
- Use American spelling, except in proper names.
- Before creating a data file, check that the filename does not already exist.

## Build and release

1. Bump `V` in sw.src.js.
2. Register new data files in index.src.html and in the CORE list of sw.src.js.
   - ADDART article files go right after `data/modern45.js`.
   - Extras files (REFS, LINKS, TODAY) go after `data/links2.js`.
3. Run `python3 tools/build.py`.
4. Test with Playwright against `python3 -m http.server 8765`. Check for page errors, overflow at phone width, pictures and backlinks.
5. Commit and push to GitHub. If push access is not available, package the changed files as an update zip instead, plus a full data/b zip, because the owner replaces the whole data/b folder.
- Keep the repository root clean: data files belong in `data/`, never loose at the top level.
