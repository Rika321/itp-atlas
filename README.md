# How to Live Longer: A Small-Molecule Atlas

Interactive React app for comparing public longevity-intervention datasets across mice, worms, and a curated human medication evidence view.

This repository focuses on:

- Mouse lifespan data from the NIA Interventions Testing Program (ITP)
- Worm lifespan data from the Caenorhabditis Intervention Testing Program (CITP)
- A curated human medication evidence atlas built from meta-analysis, epidemiology, and Mendelian evidence
- Bilingual presentation (`en`, `zh-CN`) with dataset-aware translation helpers

The app is a research and visualization tool, not prescribing advice.

## What is in the app today

The current UI ships three data sources:

- Mouse ITP
- CITP worm data, filtered into `C. elegans`, `C. briggsae`, and `C. tropicalis` views
- Human medication evidence curated in code

The repo also contains local dataset builders for killifish and Drosophila source data. Those builders are useful for normalization work, but their outputs are intentionally kept out of the published static bundle for now.

## Stack

- React 18
- Vite 5
- Tailwind CSS
- D3 utilities for survival/effect-size calculations
- Python scripts for raw-data normalization and manifest generation
- Cloudflare Pages for deployment

## Quick start

### Prerequisites

- Node.js 20+ recommended
- Python 3.10+
- `pip` for Python dependencies

### Install

```bash
npm install
python3 -m pip install -r requirements.txt
```

### Start the app

For most UI, copy, and translation changes:

```bash
npm run dev:fast
```

For full data regeneration before starting the dev server:

```bash
npm run dev
```

Open the local Vite URL shown in the terminal.

## Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev:fast` | Start Vite without rebuilding datasets. Best default for UI work. |
| `npm run dev` | Rebuild all datasets, sync published files, then start Vite. |
| `npm run prepare:data:public` | Rebuild the published mouse/CITP datasets and sync `public/data`. |
| `npm run prepare:data` | Rebuild all local datasets and sync the published subset. |
| `npm run download:citp` | Refresh raw CITP portal downloads into `data/raw/citp`. |
| `npm run build:fast` | Production Vite build without rerunning Python data prep. |
| `npm run build` | Full data rebuild plus production build. Best smoke test before merge. |
| `npm run preview` | Preview the production build locally. |
| `npm run cf:whoami` | Check Cloudflare Wrangler auth. |
| `npm run cf:deploy` | Full build, then deploy `dist/` to Cloudflare Pages. |
| `npm run cf:preview` | Full build, then create a preview deployment on Cloudflare Pages. |

## Project layout

```text
src/
  App.jsx                     App-level state and dataset/view orchestration
  components/                 Charts and UI building blocks
  lib/
    itp.js                    Parsing, summaries, rankings, survival utilities
    interventions.js          Mouse intervention labels and descriptions
    humanEvidence.js          Curated human evidence dataset
    i18n.js                   Locale selection and translation helpers
    pathways.js               Mechanistic pathway sketches

scripts/
  build_itp_dataset.py        Normalize mouse ITP source files
  build_citp_dataset.py       Normalize CITP source files
  build_killifish_dataset.py  Normalize local killifish source files
  build_drosophila_dataset.py Normalize local fly source files
  download_citp_data.py       Refresh CITP raw downloads
  sync_public_data.py         Copy published datasets into public/data

data/
  raw/                        Source snapshots and downloaded files
  processed/                  Generated normalized CSVs
  meta/                       Generated manifests

public/data/                  Published static dataset bundle used by the app
public/qr/                    Optional QR images rendered in the footer
```

## Data flow

The data pipeline is intentionally simple and file-based:

1. Raw source snapshots live in `data/raw`.
2. Python builders normalize them into a common schema in `data/processed`.
3. Each builder writes a companion manifest to `data/meta`.
4. `scripts/sync_public_data.py` copies the published subset into `public/data`.
5. The React app reads `public/data/*` for mouse and CITP, and imports the human dataset directly from `src/lib/humanEvidence.js`.

Published today:

- `itp_lifespan_all.csv`
- `itp_dataset_manifest.json`
- `citp_lifespan_all.csv`
- `citp_dataset_manifest.json`

Local-only for now:

- killifish outputs
- Drosophila outputs

That split is deliberate. `sync_public_data.py` removes the local-only datasets from `public/data` so they do not ship with the deployed app.

## Working with content and translations

The main places contributors will touch are:

- `src/App.jsx` for page composition and high-level UX
- `src/lib/itp.js` for dataset parsing, ranking, and survival logic
- `src/lib/interventions.js` for mouse intervention display names and descriptions
- `src/lib/humanEvidence.js` for the curated human evidence catalog
- `src/lib/i18n.js` for translation strings and localization helpers

If you add new user-facing strings tied to dataset content:

- Add the English source string where it belongs
- Add the matching Chinese translation in `src/lib/i18n.js`
- Prefer reusing existing translation helpers instead of duplicating translated copy in components

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the day-to-day workflow, verification expectations, and data/translation conventions.

If you want the short version:

- Use `npm run dev:fast` for most work
- Use `npm run build` before merging data-affecting changes
- Include screenshots for UI changes
- Document provenance for any dataset or evidence updates

## Deployment

Cloudflare Pages deployment notes live in [DEPLOY.md](./DEPLOY.md).

The repo is configured for direct upload with Wrangler via `wrangler.toml`.

## Notes for maintainers

- The human evidence view is curated in code rather than loaded from CSV.
- The killifish and Drosophila builders are useful normalization references even though they are not currently exposed in the shipped app.
- `public/data` should be treated as generated output, not a hand-edited source of truth.
