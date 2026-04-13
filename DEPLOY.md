# Cloudflare Pages Setup

This repository is configured for Cloudflare Pages Direct Upload using the project name `livelonger`.

## First-time setup

1. Install JavaScript and Python dependencies:

   ```bash
   npm ci
   python3 -m pip install -r requirements.txt
   ```

2. Log in to Cloudflare:

   ```bash
   npx wrangler login
   ```

3. Create the Pages project:

   ```bash
   npx wrangler pages project create livelonger
   ```

   When prompted for the production branch, use `main` if this repository uses `main`. If `livelonger` is unavailable, pick another project name and update `name` in `wrangler.toml`.

4. Deploy the site:

   ```bash
   npm run cf:deploy
   ```

## Later deployments

```bash
npm run cf:deploy
```

If you are on a new machine or recreated your Python environment, run:

```bash
npm run setup:python
```

## Preview deployments

```bash
npm run cf:preview
```
