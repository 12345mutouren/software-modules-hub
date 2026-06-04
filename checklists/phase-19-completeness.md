# 第十九阶段完成度清单

第十九阶段目标：把 starter generator 从项目规划生成器升级为可生成真实代码骨架的脚手架。

## 要求

- [x] 支持 `--with-code`。
- [x] 生成 `package.json`。
- [x] 生成 `src/app.mjs`。
- [x] 生成 `src/store.mjs`。
- [x] 生成 `test/app.test.mjs`。
- [x] 生成 `.env.example`。
- [x] 生成 `docker-compose.yml`。
- [x] 生成后的项目可以运行 `npm test`。
- [x] starter generator 测试覆盖代码骨架。

## 文件覆盖

| 类型 | 文件 |
| --- | --- |
| 生成器 | `starter-generator/create-starter.mjs` |
| 测试 | `starter-generator/test/create-starter.test.mjs` |
| 文档 | `starter-generator/README.md` |

