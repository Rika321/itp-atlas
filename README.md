<p align="center">
  <h1 align="center">How to Live Longer</h1>
  <p align="center">
    A small-molecule atlas for public longevity-intervention signals.
  </p>
  <p align="center">
    <a href="https://livelonger.pages.dev">Live Site</a>
    ·
    <a href="./DEPLOY.md">Deploy</a>
    ·
    <a href="./CONTRIBUTING.md">Contribute</a>
  </p>
  <p align="center">
    <img alt="React" src="https://img.shields.io/badge/React-18-149eca">
    <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646cff">
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-CSS-38bdf8">
    <img alt="Cloudflare Pages" src="https://img.shields.io/badge/Cloudflare-Pages-f38020">
  </p>
</p>

Compare public mouse and worm lifespan screens with public human UK Biobank
medication/all-cause-mortality signals. The app is built for exploration and
evidence review, not medical or prescribing advice.

```bash
npm install
python3 -m pip install -r requirements.txt
npm run dev:fast
```

## What It Shows

- Mouse ITP lifespan interventions
- CITP worm interventions for `C. elegans`, `C. briggsae`, and `C. tropicalis`
- Human UK Biobank ACM medication signals from Morin et al. 2024 Aging Cell
- English and Simplified Chinese UI copy
- Dark and light themes

Local builders also normalize killifish and Drosophila diet-intervention source
data. Those datasets are kept out of the published static bundle until their
views are ready to ship.

## Data Model

The app keeps the data pipeline file-based and reproducible:

```text
data/raw/        downloaded or checked-in source snapshots
data/processed/  normalized CSV outputs
data/meta/       generated manifests
public/data/     deployed static data bundle
```

Published static data currently includes:

- `itp_lifespan_all.csv`
- `itp_dataset_manifest.json`
- split CITP CSV parts plus `citp_dataset_manifest.json`
- `human_acm_dataset_manifest.json`

`scripts/sync_public_data.py` copies the published subset and removes local-only
killifish, Drosophila, and UK Biobank metadata outputs from `public/data`.

## Human ACM Source

The human tab uses public supplement data only:

- **Data Table 2**: all 406 no-concentration medication ACM rows with `N>=500`
- **Data Table 4**: six Figure 5 medication-class rows

Rows are ranked as `1 - HR`. The UI displays rows with reported `P <= 0.05` and
splits them by lower or higher ACM direction.

Data Table 3 dose/formulation rows are excluded from the main table because they
duplicate medication-level rows. Data Table 5 is source context, not an ACM
result table. No participant-level UK Biobank data is downloaded or included.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev:fast` | Start Vite without rebuilding data. |
| `npm run dev` | Rebuild data, sync public data, then start Vite. |
| `npm run build:fast` | Build the app without rebuilding data. |
| `npm run build` | Full data rebuild plus production build. |
| `npm run preview` | Preview `dist/` locally. |
| `npm run cf:whoami` | Check Wrangler authentication. |
| `npm run cf:deploy` | Build and deploy to Cloudflare Pages. |

Data refresh:

| Command | Purpose |
| --- | --- |
| `npm run download:citp` | Refresh raw CITP downloads. |
| `npm run download:human:acm` | Download the public Morin et al. ACM supplement. |
| `npm run build:human:acm` | Generate the human ACM manifest. |
| `npm run download:ukb:metadata` | Refresh public UK Biobank metadata snapshots. |
| `npm run build:ukb:metadata` | Generate the local UK Biobank metadata manifest. |
| `npm run prepare:data` | Rebuild local datasets and sync the deployed bundle. |

## Project Layout

```text
src/App.jsx                  app state, loading, page composition
src/components/              charts and UI components
src/lib/itp.js               parsers, rankings, survival helpers
src/lib/humanEvidence.js     fallback human project-source manifest
src/lib/i18n.js              translations and localization helpers
src/lib/pathways.js          pathway diagrams and labels
scripts/                     data download/build/sync utilities
```

## Deployment

Cloudflare Pages project: `livelonger`.

```bash
npm run cf:whoami
npm run cf:deploy
```

`wrangler.toml` points Pages to `dist/`. See [DEPLOY.md](./DEPLOY.md) for first
setup steps.
