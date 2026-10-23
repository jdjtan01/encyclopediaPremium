# Encyclopedia Premium

An offline-friendly, Encarta-style encyclopedia that runs as a static site.

## Deploy on GitHub Pages
1. Create a repository and upload everything in this folder, keeping the structure:
   `index.html`, the `data/` folder and the `tools/` folder.
2. In the repository, open Settings, then Pages, choose the main branch and the root folder, and save.
3. Open the Pages link GitHub gives you.

`index.html` loads every file in `data/`, so all of them must be uploaded.

## Photos
Photos load from Wikimedia Commons when the site is online. Articles without a listed photo look one up by title the first time you open them.
To check and repair the photo list, run `python tools/check_images.py` on your own computer. It writes `data/images-auto.js`.
To set a photo by hand, add the article id and a Commons file name to `data/images.js`.

## Adding content
Articles live in the `data/articles-*.js` files, extra sections in `data/extra-sections*.js`, Today in history events in `data/today*.js`, and Dictionary terms in `data/terms*.js`.
After adding a new data file, add a matching script tag to `index.html`.
