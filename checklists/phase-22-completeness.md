# 第二十二阶段完成度清单

第二十二阶段目标：新增 Docker Compose 一键启动参考环境。

## 要求

- [x] 有 deployment-playground 入口。
- [x] 有 Docker Compose 参考。
- [x] 有环境变量样例。
- [x] 有 smoke check 脚本。
- [x] 根级 `npm test` 覆盖 smoke check。

## 文件覆盖

| 类型 | 文件 |
| --- | --- |
| 入口 | `deployment-playground/README.md` |
| Compose | `deployment-playground/docker-compose.yml` |
| 环境变量 | `deployment-playground/.env.example` |
| Smoke check | `deployment-playground/smoke-check.mjs` |

