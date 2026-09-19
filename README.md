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

The build runs TypeScript checks and produces a static site in `dist/`. Upload the contents to any static host. For GitHub Pages, select **GitHub Actions** as the Pages source; the included workflow builds and deploys on pushes to `main` or `master`, or by manual dispatch. Deployment only occurs when that workflow runs on GitHub.

## Content

- Edit photograph titles, descriptions, and categories in `src/Components/Gallery/Gallery.tsx`.
- Photo imports are in `src/Components/Gallery/images.ts`. The site serves optimized WebP copies. After changing original JPEGs, run `npm run images:optimize` and commit the generated `optimized/` images and `dimensions.json`.
- Update biography and contact details in `src/App.tsx`.
- Design tokens, layout, and reduced-motion support are in `src/index.css`.
- The gallery supports category filtering and a native modal dialog with arrow-key navigation, Escape dismissal, and browser-managed focus containment/restoration.

Use npm and the committed `package-lock.json` as the single dependency source. Pre-migration local lockfiles and installed dependencies are preserved in ignored `.local-backup/` on the migration machine.

All photographs © Jaafar Yassine. Written permission is required for reuse.
