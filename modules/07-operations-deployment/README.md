# 07 运维部署

运维部署回答：软件如何上线，如何稳定运行，出问题后如何发现和恢复。

一个软件只在本地能跑不算完整。完整软件需要环境、部署、域名、HTTPS、备份、监控、报警、CI/CD 和灾难恢复。

## 核心能力

- 服务器：云服务器、容器、Serverless。
- 部署：开发环境、测试环境、生产环境。
- 域名和 HTTPS。
- 数据库备份。
- 日志监控。
- 错误报警。
- 性能监控。
- 自动发布：CI/CD。
- 灾难恢复：服务器坏了怎么恢复。

## 运行环境类别

| 类别 | 说明 | 适合场景 |
| --- | --- | --- |
| 云服务器 | 自己管理机器和进程 | 控制力强，运维责任大 |
| 容器 | Docker、Compose、Kubernetes | 多服务、可移植、易扩展 |
| Serverless | 函数、边缘运行、托管后端 | 弹性、低运维、受平台限制 |
| PaaS | Vercel、Render、Railway、Fly.io | 快速上线 Web 应用 |
| 自托管 PaaS | Coolify、CapRover、Dokku | 想自己控制部署平台 |
| 混合部署 | 前端托管 + 后端容器 + 数据库托管 | 常见生产组合 |

## 环境类别

| 环境 | 作用 |
| --- | --- |
| 本地环境 | 开发和调试 |
| 开发环境 | 团队内部联调 |
| 测试环境 | QA、验收、自动化测试 |
| 预发布环境 | 接近生产配置，发布前验证 |
| 生产环境 | 用户真实访问 |

## 监控类别

| 类别 | 关注什么 |
| --- | --- |
| 日志监控 | 请求、错误、任务、审计 |
| 错误报警 | 异常、崩溃、失败任务 |
| 性能监控 | 响应时间、吞吐、资源占用 |
| 可用性监控 | 服务是否可访问 |
| 数据库监控 | 慢查询、连接数、存储空间 |
| 业务监控 | 注册、登录、支付、订单、转化 |

## 发布和恢复

| 类别 | 说明 |
| --- | --- |
| CI/CD | 自动测试、构建、发布 |
| 蓝绿发布 | 新旧版本切换 |
| 滚动发布 | 分批替换实例 |
| 回滚 | 发布失败后回到旧版本 |
| 数据库备份 | 定时备份和保留策略 |
| 恢复演练 | 定期验证备份能恢复 |
| 灾难恢复 | 机器、数据库或区域故障后的恢复流程 |

## 常见数据

- 环境变量。
- 部署配置。
- 构建产物。
- 日志。
- 指标。
- 错误事件。
- 备份文件。
- 发布记录。
- 事故记录。

## 常见流程

1. 开发者提交代码。
2. CI 运行测试和构建。
3. 通过后部署到测试或生产环境。
4. 系统通过域名和 HTTPS 对外提供服务。
5. 运行中持续收集日志、指标和错误。
6. 出现异常时触发报警。
7. 需要时回滚版本或从备份恢复。

## 代表 GitHub 仓库

| 仓库 | 类型 | 适合学习 |
| --- | --- | --- |
| [docker/compose](https://github.com/docker/compose) | tooling | 多服务本地和生产编排 |
| [kubernetes/kubernetes](https://github.com/kubernetes/kubernetes) | platform | 容器编排 |
| [helm/helm](https://github.com/helm/helm) | tooling | Kubernetes 应用部署 |
| [hashicorp/terraform](https://github.com/hashicorp/terraform) | tooling | 基础设施即代码 |
| [coollabsio/coolify](https://github.com/coollabsio/coolify) | platform | 自托管部署平台 |
| [caprover/caprover](https://github.com/caprover/caprover) | platform | 自托管 PaaS |
| [dokku/dokku](https://github.com/dokku/dokku) | platform | Git push 部署 |
| [prometheus/prometheus](https://github.com/prometheus/prometheus) | platform | 指标监控 |
| [grafana/grafana](https://github.com/grafana/grafana) | platform | 监控面板 |
| [getsentry/sentry](https://github.com/getsentry/sentry) | platform | 错误监控 |
| [open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector) | tooling | 可观测性数据采集 |
| [go-gitea/gitea](https://github.com/go-gitea/gitea) | platform | 自托管 Git 服务和 CI 生态参考 |

## 设计检查清单

- [ ] 是否区分本地、测试和生产环境。
- [ ] 是否有环境变量管理。
- [ ] 是否有域名和 HTTPS。
- [ ] 是否有自动测试、构建和发布。
- [ ] 是否有日志、错误和性能监控。
- [ ] 是否有报警策略。
- [ ] 是否有数据库备份。
- [ ] 是否验证过备份恢复。
- [ ] 是否有回滚和灾难恢复流程。

