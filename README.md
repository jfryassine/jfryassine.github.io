# Jaafar Yassine — A World in Passing

A responsive photography portfolio built with React, TypeScript, and Vite. Browse photographs by location, with a moving train-window backdrop between the introduction and collection. Original photos and MOV clips are retained in `src/Components/Gallery/imgs`.

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

- Add photos or videos to `src/Components/Gallery/imgs`, named by location, for example `Paris (7).jpg` or `Vienna (2).MOV`. JPEG, PNG, WebP, MOV, and MP4 are supported. Numbers are stripped from the displayed location; locations and totals are generated automatically.
- Run `npm run media:prepare` after adding, renaming, or removing media. It creates WebP previews and larger photos, H.264/AAC MP4 films, video posters, and the generated `src/Components/Gallery/media.ts` catalogue. The original files are unchanged. FFmpeg is installed as a development dependency; no separate system installation is required.
- Commit the originals, generated `optimized/` files, and `media.ts` together. Unreferenced old generated files are not bundled into the site. The tests check that the catalogue includes every selected source file. `media-settings.json` excludes the Iraq clip from the site while preserving its original file.
- Add visual descriptions in `scripts/media-metadata.mjs` and rerun preparation. Files without a description use their location as fallback text.
- `npm run images:optimize` remains an alias for media preparation. Photo and film components are in `src/Components/Gallery/`; counts and location groups are in `collections.ts`.
- Update biography and contact details in `src/App.tsx`.
- Design tokens, layout, and reduced-motion support are in `src/index.css`.
- The gallery supports location filtering and a native modal dialog with arrow-key navigation, Escape dismissal, and browser-managed focus containment/restoration.
- The Vienna film is a muted, looping background with a pause/play button. It loads only while the section is in view and pauses when the browser tab is hidden. Reduced-motion preferences and playback failures use its still poster. The separate video-player section has been removed; only the Vienna video is included in the production build.

Use npm and the committed `package-lock.json` as the single dependency source. Pre-migration local lockfiles and installed dependencies are preserved in ignored `.local-backup/` on the migration machine.

All photographs © Jaafar Yassine. Written permission is required for reuse.
