# Jaafar Yassine — A Roman Journal

A responsive photography portfolio built with React, TypeScript, and Vite. Original photographs are retained in `src/Components/Gallery/imgs`.

## Development

Use Node.js 22.12+ (22.x) or 24+ and npm.

```sh
npm ci
npm start
```

## Checks and production

```sh
npm test
npm run build
npm run preview
```

The build runs TypeScript checks and produces a static site in `dist/`. Upload the contents to any static host.

### GitHub Pages setup

1. Open the repository's **Settings → Pages → Build and deployment**.
2. Set **Source** to **GitHub Actions**, instead of **Deploy from a branch**.
3. Push the deployment workflow to `develop`. The **Deploy photography portfolio** workflow will build, test, and publish `dist/`. It can also be started manually from the Actions tab when the workflow is on the default branch.
4. Wait for that workflow's deployment job to succeed before refreshing the site.

The production branch for this repository is `develop`. Publishing its root directly serves the development `index.html`, which imports `/src/index.tsx`. Browsers cannot execute that TypeScript source, so the result is a blank page. A successful **pages build and deployment** run from branch publishing does not mean Vite has built the app. The deployed HTML must reference compiled files under `assets/`, not `/src/`.

## Content

- Edit photograph titles, descriptions, and categories in `src/Components/Gallery/Gallery.tsx`.
- Photo imports are in `src/Components/Gallery/images.ts`. The site serves optimized WebP copies. After changing original JPEGs, run `npm run images:optimize` and commit the generated `optimized/` images and `dimensions.json`.
- Update biography and contact details in `src/App.tsx`.
- Design tokens, layout, and reduced-motion support are in `src/index.css`.
- The gallery supports category filtering and a native modal dialog with arrow-key navigation, Escape dismissal, and browser-managed focus containment/restoration.

Use npm and the committed `package-lock.json` as the single dependency source. Pre-migration local lockfiles and installed dependencies are preserved in ignored `.local-backup/` on the migration machine.

All photographs © Jaafar Yassine. Written permission is required for reuse.
