# Encyclopedia Premium

An offline-friendly, Encarta-style encyclopedia that runs as a static site.

## Deploy on GitHub Pages
1. Create a repository and upload everything in this folder, keeping the structure:
   `index.html`, the `data/` folder and the `tools/` folder.
2. In the repository, open Settings, then Pages, choose the main branch and the root folder, and save.
3. Open the Pages link GitHub gives you.

`index.html` loads every file in `data/`, so all of them must be uploaded.

## Photos
Photos load when the site is online, in this order:
1. A Commons file name listed by hand in `data/images.js` (or `images2.js`, `images3.js`).
2. Otherwise the lead image of the Wikipedia page named for that article in `data/wiki.js`. Each browser remembers the result.
3. If neither works, the article keeps its colour banner.

To change a photo, edit the article's Wikipedia page title in `data/wiki.js`, or add a Commons file name to `data/images.js`.
Readers can also hide a photo they don't like with the Hide photo button on the article.
To check everything at once, run `python tools/check_images.py` on your own computer. It reports missing files and pages whose lead image is a flag or map, and writes `data/images-auto.js`.

## Features
Each page has its own address (for example `#/art/dna` or `#/browse/Philippines`), so the Back button works and links can be shared.
The theme button in the header switches between light and dark; the site follows the device setting until you choose.
Reading history, bookmarks, notes and quiz best scores are stored only in the reader's browser.

## Adding content
Articles live in the `data/articles-*.js` files, and their longer encyclopedia material (opening summary, extra sections, Key facts and Key dates) lives in `data/deep-*.js`. The in-depth layer (six more sections, a Spotlight box, Key words and extra Did you know facts per article) lives in `data/deep-more-*.js`. Articles (add a Wikipedia page title for each new article to `data/wiki.js`), extra sections in `data/extra-sections*.js`, Today in history events in `data/today*.js`, and Dictionary terms in `data/terms*.js`.
After adding a new data file, add a matching script tag to `index.html`.

## Reference-book layout

The layout layer lives in `ui/dk.js` and `ui/dk.css`, loaded after the main script.

- Pages: Cover (`#/cover`), Contents (`#/contents`), category openers (`#/cat/<name>`), Index (`#/index`), Glossary (`#/gloss`) and How to use (`#/howto`).
- Articles get:
  - a running head, an article number, and category colors with a side tab
  - fact-file callouts around the main photo, plus conservation status for some animals
  - captioned Commons photos placed through the text
  - a picture timeline of key dates
  - See also and Further reading
  - a print button that lays the article out as a two-column landscape spread
- Data files:
  - `data/catinfo.js`: category taglines, introductions and featured articles
  - `data/visuals.js`: scale comparisons (`SCALE`) and conservation status (`CONS`)
  - `data/diagrams.js` and `data/diagrams2.js`: labeled diagrams (`DIAG`), keyed by article id
- `data/visuals.js` also holds standard fact files (`FACT`) for planets and animals

## Reference features (second edition of the layout)

- **Links inside the text:** `ui/ref.js`, with link phrases in `data/links.js`. Mentions of other articles and A–Z entries become links.
- **Citations and edition page:** How to cite (APA, MLA, Chicago) and Report an error on every article. The About this edition page (`#/about`) holds editorial standards, picture credits and saved error reports.
- **People section:** 42 biographies in `data/people1.js` to `people7.js`, loaded by `data/people-load.js`.
- **Quick reference A–Z:** 319 short entries in `data/short1.js` to `short8.js`. Pages are `#/az` and `#/e/<id>`, built by `ui/short.js`.
- **Location maps and charts:** `data/locations.js`, `data/charts.js` and `ui/maps.js`.
- **Fixed photos:** `data/images-pinned.js`. Turn on the photo editor from the About page, choose photos and aim labels, then download the file and replace `data/images-pinned.js` with it.
- **Filipino summaries and pronunciation:** `data/tl1.js` to `tl6.js` and `data/pron.js`, shown by `ui/tl.js`.
- **Countries, regions, quizzes, print book and smarter search:** `ui/more.js`, with the Philippine regions in `data/regions.js`. Pages are `#/countries`, `#/country/<name>`, `#/regions`, `#/region/<id>` and `#/book`.
- **Offline use:** `manifest.webmanifest`, `sw.js` and `icons/`. Offline use works when the site is served over http or https, not opened as a local file. Add any new files to the CORE list in `sw.js`.

## Subjects and sub-sections (third edition of the layout)

The encyclopedia is arranged like a printed reference book: 11 subjects, each split into sub-sections.

- **The arrangement:** `data/subjects.js` lists every subject with its icon, colors, tagline, introduction, featured articles and sub-sections, and every article id in the order of the book. To move an article, move its id to another sub-section. An article not listed goes to an "Other articles" sub-section of the subject its old section maps to (`OLDSEC`).
- **Applying it:** `ui/subjects-pre.js` runs straight after the main script. Each article keeps its old section in `a.oc`, gets its subject in `a.c` and its sub-section in `a.sub`, and the article list is sorted into book order, so numbering, Contents, colors, Browse, the Glossary and quizzes all follow the subjects.
- **Pages and features:** `ui/subjects.js` and `ui/subjects.css`, loaded last:
  - Subject pages (`#/cat/<subject>`) with Start here, sub-section tiles and Words to know
  - Sub-section pages (`#/cat/<subject>/<sub-section>`) with article cards
  - The Subjects menu and the More menu that replace the long row of buttons
  - Breadcrumb running heads on articles, a reading progress bar, a contents list that highlights the section you are reading, Up next within each sub-section, and one ⋯ More menu for the article tools
  - The front page and Contents by subject
- **Old links** such as `#/cat/Science` still work: they open the subject that section became.
- **New articles:** 20 Animal Kingdom articles in `data/animals1.js` to `animals5.js`, and 20 more for the thinnest sub-sections in `data/more1.js` to `more5.js`, all added through `ADDART` in `data/animals-load.js`. Use the same format for any new article in any subject, then list its id in `data/subjects.js`. Every sub-section now has at least five articles.

## Content round: gaps, references, flagships, timeline and guides

- **42 gap articles** in `data/gaps1.js` to `gaps8.js` (Space, the Philippines, Planet Earth, History, How We Live, Technology, the Human Body), added with `ADDART`. New sub-sections: Asia Through the Ages, Government and Society, Transport and Engineering.
- **References:** `data/refs.js` lists specific sources (Britannica, UNESCO, the Official Gazette, PHIVOLCS, Lawphil, Nobel Prize and others) for every Philippines and People article. The article’s Wikipedia page is added automatically. They appear as a References list above Further reading.
- **Flagship articles:** `data/deep3-1.js` to `deep3-4.js` add six longer sections to 25 key articles (the DEEP3 layer, merged in `ui/subjects-pre.js`).
- **Visuals:** `data/diagrams3.js` (tsunami, rocket, flower, the Sun, the neuron) and `data/visuals2.js` (12 scale drawings, 30 locator maps and 32 Today in history events).
- **Philippine history timeline** (`#/phtimeline`) and **reading guides** (`#/guides`, `#/guide/<id>`): `ui/guides.js`. Articles in a guide show a banner with the next step. Edit `GUIDES` in that file to add a guide.
- Totals: 387 articles in 11 subjects and 51 sub-sections, about 242,000 words, 1,548 key words and 47 diagrams.

## Atlas

`ui/atlas.js` replaces the original atlas. Scroll or pinch to zoom, drag to move, double-click to zoom in, use + / − / 0 and the arrow keys when the map is focused, search for a country by name and link straight to one with `#/atlas/<country>`. Russia and Fiji in `data/atlas.js` were split at the 180° line so they no longer draw bands across the map.

## Countries, flags and the atlas (round 6)
- `data/countries.js` (`window.CTRY`): data for all 177 places on the map, keyed by the atlas names. Includes ISO codes, official name, continent and region, capitals, languages, currencies, calling code, internet domain, demonym, area, neighbours, landlocked and UN status, World Bank population (to 2024) and GDP (2023), and time zones. Northern Cyprus and Somaliland carry notes on their disputed status. Taiwan's population is the government estimate.
- `flags/`: 175 SVG flags from flag-icons (MIT), all cached for offline use.
- `ui/countries.js` + `ui/countries.css`:
  - **Countries of the world** (`#/countries`): flag cards, continent filter, search, and sorting by population, area, density or GDP per person.
  - **Country fact files** (`#/country/<name>`): flag header, stat tiles with world ranks, fuller fact file, clickable neighbours, comparison with the Philippines, and previous/next country.
  - **Flag quiz** (`#/flags`).
  - Shared helpers in `window.CUI`.
- `ui/atlas.js`:
  - Continent colour-coding, plus population, density and GDP-per-person map modes.
  - A clickable legend that picks out one group, flags in tooltips and the profile panel, clickable neighbours, and better fitting for island countries.
- Service worker cache is now `ep-v6`.
