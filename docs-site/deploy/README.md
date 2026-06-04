# Docs Site Deployment

第 29 阶段文档站部署包。

目标：让 `docs-site` 可以被部署到 GitHub Pages 或 Vercel。

## Files

| File | Purpose |
| --- | --- |
| `github-pages-workflow.yml` | 可复制到 `.github/workflows/docs-site.yml` 的 GitHub Pages workflow |
| `vercel.json` | Vercel 静态站配置 |
| `deployment-checklist.md` | 部署前检查 |

## GitHub Pages

1. Copy `docs-site/deploy/github-pages-workflow.yml` to `.github/workflows/docs-site.yml`.
2. Enable GitHub Pages in repository settings.
3. Set source to GitHub Actions.
4. Push to `main`.

## Vercel

1. Import the repository.
2. Use `node docs-site/build-docs-site.mjs --out docs-site/dist` as build command.
3. Use `docs-site/dist` as output directory.

