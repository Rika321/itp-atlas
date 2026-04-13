# Contributing

Thanks for contributing.

This project mixes frontend code, translation work, and lightweight data engineering. The fastest way to stay productive is to use the smallest workflow that matches your change.

## Setup

### Prerequisites

- Node.js 20+ recommended
- Python 3.10+

### Install dependencies

```bash
npm install
python3 -m pip install -r requirements.txt
```

## Choose the right workflow

### UI, copy, or translation changes

Use the fast dev server:

```bash
npm run dev:fast
```

This uses the committed `public/data` snapshot and avoids rerunning Python builders on every start.

### Data-pipeline changes

If you changed a Python builder, raw source snapshot, or manifest logic:

```bash
npm run prepare:data
```

Use the full build after that:

```bash
npm run build
```

### Published-data changes only

If your work only affects the datasets that the public app currently ships:

```bash
npm run prepare:data:public
```

That rebuilds:

- ITP mouse data
- CITP worm data
- the published `public/data` bundle

It does not rebuild the local-only killifish and Drosophila outputs.

## Repository conventions

### App structure

- `src/App.jsx` owns the main page state and view orchestration.
- `src/lib/itp.js` contains the shared parsing and ranking logic for the dataset views.
- `src/lib/interventions.js` is the source of truth for mouse intervention labels and descriptions.
- `src/lib/humanEvidence.js` is the curated human medication evidence atlas.
- `src/lib/i18n.js` contains the locale logic and translation dictionaries.

### Data structure

- `data/raw/` contains source snapshots or downloaded artifacts.
- `data/processed/` contains normalized CSV outputs.
- `data/meta/` contains generated manifests.
- `public/data/` contains the published static bundle consumed by the app.

Do not hand-edit `public/data` files unless you are deliberately fixing generated output and understand the generator that should be updated instead.

### Dataset scope

The current shipped UI uses:

- mouse ITP data
- CITP worm data
- human evidence curated in code

The killifish and Drosophila builders are kept in the repo as local normalization pipelines, but their outputs are intentionally removed from `public/data` by `scripts/sync_public_data.py`.

### Translation work

When adding new visible strings:

- Keep the English source string close to the feature it belongs to
- Add or reuse the Chinese translation in `src/lib/i18n.js`
- Prefer reusing helper-based localization rather than scattering direct translated copy in components

When the string comes from a dataset:

- update the source generator or dataset metadata first
- then add the translation hook if needed

## Verification

There is no formal test suite yet. The main verification steps are:

```bash
npm run build
```

And, when relevant:

- open the app locally and click through the affected view
- verify both English and Chinese if you touched copy or dataset labels
- confirm rankings, chart labels, and dataset badges still look correct

For UI changes, include screenshots in the PR when possible.

## CITP refreshes

To refresh CITP raw portal files:

```bash
npm run download:citp
```

To force a redownload:

```bash
npm run download:citp -- --force
```

Follow that with:

```bash
npm run prepare:data:public
```

## Pull requests

A good PR for this repo usually includes:

- a short summary of the user-facing change
- notes on whether data artifacts were regenerated
- provenance for any new or updated evidence/data source
- screenshots for visual changes
- confirmation that `npm run build` passed when the change affects app behavior or data
