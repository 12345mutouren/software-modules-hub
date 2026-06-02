# Monitoring And Alerting Runbook

监控目标：在用户大面积反馈前发现问题，并能定位原因。

## What To Monitor

| Category | Signals |
| --- | --- |
| Availability | Uptime, health check, error rate |
| Performance | Latency, throughput, slow queries |
| Application errors | Exceptions, failed jobs, failed webhooks |
| Infrastructure | CPU, memory, disk, network |
| Database | Connections, locks, slow queries, storage |
| Business | Registrations, logins, orders, payments, feedback |
| Security | Failed logins, rate-limit hits, suspicious access |

## Alert Rules

- [ ] 服务健康检查失败。
- [ ] 错误率超过阈值。
- [ ] 登录失败率异常升高。
- [ ] 支付 webhook 失败。
- [ ] 数据库连接接近上限。
- [ ] 队列积压超过阈值。
- [ ] 磁盘空间不足。
- [ ] 证书即将过期。

## Dashboard Sections

- Overview。
- API latency。
- Error rate。
- Database health。
- Queue and jobs。
- Auth and security。
- Business metrics。
- Recent deployments。

## Alert Quality

好的报警：

- 能说明影响范围。
- 能指向负责人。
- 有 Runbook 链接。
- 能区分 warning 和 critical。
- 不会每天误报。

