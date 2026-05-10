# How to Live Longer: A Small-Molecule Atlas

Live site: https://livelonger.pages.dev

Interactive React app for exploring public longevity-intervention signals. The
site compares mouse ITP lifespan data, CITP worm lifespan data, and public UK
Biobank medication/all-cause-mortality signals. It is a research visualization
tool, not medical or prescribing advice.

## Current App

Published views:

- Mouse ITP lifespan interventions
- CITP worm interventions for `C. elegans`, `C. briggsae`, and `C. tropicalis`
- Human UK Biobank ACM signals from Morin et al. 2024 Aging Cell supplement

Local builders also exist for killifish and Drosophila diet-intervention source
data, but those datasets are not currently exposed in the published static app.

## Stack

- React 18 + Vite 5
- Tailwind CSS
- D3 utilities for survival/effect-size calculations
- Python data builders
- Cloudflare Pages direct upload via Wrangler

## Quick Start

```bash
npm install
python3 -m pip install -r requirements.txt
npm run dev:fast
```

Use `npm run dev` when you want to regenerate datasets before starting Vite.

## Common Commands

| Command | Purpose |
| --- | --- |
| `npm run dev:fast` | Start Vite only. Best for UI/copy changes. |
| `npm run dev` | Rebuild datasets, sync public data, then start Vite. |
| `npm run build:fast` | Production Vite build without data rebuild. |
| `npm run build` | Full data rebuild plus production build. |
| `npm run preview` | Preview `dist/` locally. |
| `npm run cf:whoami` | Check Wrangler auth. |
| `npm run cf:deploy` | Build and deploy `dist/` to Cloudflare Pages. |
| `npm run cf:preview` | Build and create a Cloudflare Pages preview deploy. |

Data refresh commands:

| Command | Purpose |
| --- | --- |
| `npm run download:citp` | Refresh raw CITP portal downloads. |
| `npm run download:human:acm` | Download the public Morin et al. ACM supplement. |
| `npm run build:human:acm` | Build `data/meta/human_acm_dataset_manifest.json`. |
| `npm run download:ukb:metadata` | Refresh public UK Biobank metadata snapshots. |
| `npm run build:ukb:metadata` | Build the local UK Biobank metadata manifest. |
| `npm run prepare:data` | Rebuild local datasets and sync the published bundle. |

## Data Flow

```text
data/raw/        source snapshots and downloaded files
data/processed/  normalized CSV outputs
data/meta/       generated manifests
public/data/     static bundle loaded by the deployed app
```

`scripts/sync_public_data.py` publishes:

- `itp_lifespan_all.csv`
- `itp_dataset_manifest.json`
- split CITP CSV parts plus `citp_dataset_manifest.json`
- `human_acm_dataset_manifest.json`

It deliberately removes killifish, Drosophila, and UK Biobank metadata manifests
from `public/data` until those views are meant to ship.

## Human ACM View

The human tab uses public supplement data only. It imports:

- Data Table 2: all 406 no-concentration medication ACM rows with `N>=500`
- Data Table 4: six Figure 5 medication-class rows

The UI displays rows with reported `P <= 0.05` and ranks effect as `1 - HR`.
Top filters split the displayed rows into all, lower ACM, and higher ACM.

Data Table 3 dose/formulation rows are not part of the main human table because
they would duplicate medication-level rows. Data Table 5 is used as source
context only, not as an ACM result table.

No participant-level UK Biobank data is downloaded or included.

## Project Layout

```text
src/App.jsx                  app state, dataset loading, page composition
src/components/              charts and UI components
src/lib/itp.js               dataset parsing, rankings, survival helpers
src/lib/humanEvidence.js     fallback human project-source manifest
src/lib/i18n.js              translations and localization helpers
src/lib/pathways.js          pathway diagrams and labels
scripts/                     download, build, and sync data utilities
```

## Content And Translation

User-facing English source strings should have matching Simplified Chinese
translations in `src/lib/i18n.js`. Dataset-derived text should go through the
existing localization helpers instead of duplicating translated copy in
components.

## Deployment

The Cloudflare Pages project is `livelonger`; `wrangler.toml` points Pages to
`dist/`.

```bash
npm run cf:whoami
npm run cf:deploy
```

More setup detail is in [DEPLOY.md](./DEPLOY.md). Day-to-day contribution notes
are in [CONTRIBUTING.md](./CONTRIBUTING.md).
