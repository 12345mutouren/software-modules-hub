# Docs Site Deployment

目标：让 `docs-site` 可以被部署到 GitHub Pages 或 Vercel。

## Files

| File | Purpose |
| --- | --- |
| `.github/workflows/docs-site.yml` | 当前启用的 GitHub Pages workflow |
| `github-pages-workflow.yml` | workflow 的备份模板 |
| `vercel.json` | Vercel 静态站配置 |
| `deployment-checklist.md` | 部署前检查 |

## GitHub Pages

1. GitHub Pages source is set to GitHub Actions.
2. `.github/workflows/docs-site.yml` builds `docs-site/dist`.
3. Push to `main`.
4. Open `https://12345mutouren.github.io/software-modules-hub/` after the workflow succeeds.

## Vercel

1. Import the repository.
2. Use `node docs-site/build-docs-site.mjs --out docs-site/dist` as build command.
3. Use `docs-site/dist` as output directory.
