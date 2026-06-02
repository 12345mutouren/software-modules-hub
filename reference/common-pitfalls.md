# Common Pitfalls

这些是做完整软件时最常见的错误。

## Product

| Pitfall | Better |
| --- | --- |
| 先选框架，后想用户 | 先写 product brief |
| 功能越多越好 | 先定义核心流程和非目标 |
| 没有成功指标 | 定义激活、留存、转化或任务完成率 |

## Account And Security

| Pitfall | Better |
| --- | --- |
| 明文保存密码 | 使用 bcrypt、argon2 或 scrypt 哈希 |
| 只在前端隐藏按钮 | 后端做权限校验 |
| JWT 永不过期 | 设置过期、刷新和撤销策略 |
| 没有登录失败限制 | 加限流、验证码或锁定策略 |
| 没有审计日志 | 敏感操作写 audit logs |

## Database

| Pitfall | Better |
| --- | --- |
| 所有数据都塞一个表 | 按业务对象建模 |
| 文件直接塞数据库 | 对象存储保存文件，数据库保存元数据 |
| 没有索引和分页 | 为查询设计索引和分页 |
| 没有迁移记录 | 使用 migration 管理 schema |
| 只备份不演练恢复 | 定期做 restore drill |

## Backend

| Pitfall | Better |
| --- | --- |
| 接口没有输入校验 | 每个 API 校验输入 |
| 支付 webhook 不验签 | 服务端验证签名 |
| 重复提交导致重复订单 | 使用幂等键和状态机 |
| 耗时任务阻塞请求 | 使用队列和后台任务 |

## Frontend

| Pitfall | Better |
| --- | --- |
| 只有正常状态 | 设计加载、空、错误、无权限状态 |
| 表单错误不清楚 | 给字段级错误和提交反馈 |
| 后台页面太花哨 | 管理后台优先密度、扫描和效率 |
| 移动端溢出 | 设计响应式约束和文本换行 |

## Operations

| Pitfall | Better |
| --- | --- |
| 只有生产环境 | 至少有 local、staging、production |
| 没有回滚计划 | 发布前写 rollback plan |
| 没有监控 | 接入日志、错误、性能和业务指标 |
| 报警太吵 | 定义可行动的报警规则 |
| 事故后不复盘 | 写 postmortem 和行动项 |

## Testing

| Pitfall | Better |
| --- | --- |
| 只测函数不测流程 | 加 API 和 E2E 测试 |
| 不测权限 | 写权限矩阵测试 |
| 不测安全风险 | 检查注入、越权、CSRF、限流 |
| 测试不进 CI | 用 GitHub Actions 或其他 CI 自动跑 |

