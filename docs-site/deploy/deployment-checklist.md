# Docs Site Deployment Checklist

## Before Deploy

- [ ] `npm run test:docs-site` passes.
- [ ] `node docs-site/build-docs-site.mjs --out docs-site/dist` builds pages.
- [ ] `docs-site/site-map.json` includes required pages.
- [ ] GitHub Pages or Vercel settings are configured.

## After Deploy

- [ ] Home page loads.
- [ ] Master Index page loads.
- [ ] Roadmap page loads.
- [ ] Changelog page loads.
- [ ] Project Status page loads.

