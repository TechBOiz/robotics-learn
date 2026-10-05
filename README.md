# Everything Robotics · Learn

A static site of robotics learning articles, published with GitHub Pages.

It is self-contained in this folder and does not depend on, or change, the main
Everything Robotics platform (companies / jobs / map). It can be moved to its own
repository unchanged.

## Run it

Requires Node 22.12 or newer.

```bash
cd learn-site
npm install
npm run dev        # http://localhost:4321/everything-robotics/
npm run build      # outputs dist/
npm run check:links
```

## Add an article

1. Create `src/content/articles/<topic>/NN-your-slug.mdx`. The `NN-` prefix only orders
   files on disk; the URL is `/<topic>/your-slug/`.
2. Start it with this front matter:

   ```yaml
   ---
   title: "Article title"
   summary: "One or two sentences shown on listings and under the title."
   category: actuators          # a topic id from src/data/categories.ts
   order: 5                     # position within the topic
   level: intro                 # intro | intermediate | advanced
   updated: 2026-10-05
   tags: [actuators]
   ---
   ```

3. Write Markdown. Extras available:
   - Math with `$inline$` and `$$display$$` (KaTeX).
   - Links to other articles as root-relative paths: `[text](/actuators/transmissions/)`.
   - `<Figure number={1} caption="…">…</Figure>` and `<Callout title="…">…</Callout>`
     (import them at the top of the file, as the existing articles do).
4. End with a `## Sources` list. Link every claim about a specific product, company or
   paper to its source, and label vendor-reported numbers as such.

Set `draft: true` in the front matter to keep an article out of the build.

## Add a topic

Add an entry to `src/data/categories.ts`. The topic page and its card on the home page
are generated from that list, and show the `planned` items until articles exist.

## Figures

Figures are inline SVG components in `src/figures/`. They use the classes defined under
"Shared SVG figure styling" in `src/styles/global.css`, so they follow light and dark
themes automatically.

## Deploy

The site is published with GitHub Pages, separately from the main Everything Robotics
website. Two workflow files are provided; use the one that matches where this folder lives.

**A. Inside the everything-robotics repository (as `learn-site/`)**

1. Copy `learn-site/deploy/learn-pages.yml` to `.github/workflows/learn-pages.yml` at the
   repository root.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Commit on a branch, open a pull request, and merge to `main`.

**B. In its own repository**

1. Put the contents of `learn-site/` at the root of the new repository.
2. Copy `deploy/learn-pages.standalone.yml` to `.github/workflows/learn-pages.yml`.
3. Set **Settings → Pages → Source** to **GitHub Actions**, then push to `main`.
4. For local work, set the base path to the new repository name, for example
   `BASE_PATH=/robotics-learn npm run dev` (PowerShell: `$env:BASE_PATH="/robotics-learn"; npm run dev`).

Either way the site URL and base path are read from the Pages settings at build time, so
the repository name or a custom domain needs no code change. Both workflows build and
check links on pull requests without publishing.

GitHub Pages on a private repository requires a paid GitHub plan, and the published site
is public either way. A public repository can use Pages on the free plan.
