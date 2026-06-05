# My Screen Time — My Choice

A trust-based screen time self-management app for tweens, built with React + TypeScript.

## What it does

- **Agreement tab** — fill out together once at the start of summer. Kid selects what matters to her on screen, sets her own limits for games and YouTube, and both sign it.
- **Weekly check-in tab** — she fills this out herself each week. Tracks life priorities (reading, being active, nourishment, self-care, etc.) and reflects on whether screens helped or got in the way.
- Data saved in `localStorage` — no backend, no accounts.

## Getting started locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Push to `main` — the workflow auto-builds and deploys

Your app will be live at `https://<your-username>.github.io/<repo-name>/`

## Stack

- React 18 + TypeScript
- Vite
- CSS custom properties (no UI library)
- GitHub Actions for CI/CD

## Customising

- `src/constants.ts` — edit activities, priorities, check-in questions
- `src/styles.css` — all styles in one file, CSS variables at the top
- `index.html` — change the page title
