# Docs Site

目标：把仓库的读者入口转换为一个轻量静态 HTML 站点，方便部署到 GitHub Pages、Vercel 或任意静态托管服务。

## Files

| File | Purpose |
| --- | --- |
| `site-map.json` | 面向读者的文档站页面清单 |
| `build-docs-site.mjs` | 无依赖静态站构建脚本 |
| `test/build-docs-site.test.mjs` | 构建脚本测试 |

## Build

```bash
node docs-site/build-docs-site.mjs --out docs-site/dist
```

## Test

```bash
npm run test:docs-site
```
