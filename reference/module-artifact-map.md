# Module Artifact Map

这个表说明每个模块通常应该产出哪些文件、表格、图或代码。

| Module | Artifacts |
| --- | --- |
| 产品层 | Product brief、用户角色表、核心流程图、页面清单、成功指标 |
| 账号系统 | 登录方式选择、注册方式选择、权限矩阵、Session/JWT 策略、账号安全流程 |
| 数据库层 | ER 图、数据表、索引、迁移计划、备份策略、数据保留策略 |
| 后端系统 | API 合同、业务服务、输入校验、权限校验、队列/定时任务、错误格式 |
| 前端/客户端 | 页面清单、组件清单、状态设计、表单校验、响应式布局、后台页面 |
| 安全 | Security review、威胁模型、限流策略、审计日志、隐私和数据删除策略 |
| 运维部署 | 环境矩阵、部署脚本、CI/CD、监控、报警、备份恢复、事故 Runbook |
| 测试 | 单元测试、API 测试、E2E 测试、权限测试、安全测试、性能测试 |
| 商业/运营 | 计划/会员、订单、支付、发票、客服、反馈、审核、分析和推荐流程 |
| 文档 | 用户文档、API 文档、数据库文档、部署文档、管理员手册、FAQ |

## Minimal Project Package

一个真实项目启动前，至少应该有：

- Product brief。
- Module selection。
- Permission matrix。
- Data model。
- API contract。
- Security review。
- Test plan。
- Launch plan。
- Risk register。

## Production Package

上线前还应该有：

- Deployment checklist。
- Backup and restore runbook。
- Incident response runbook。
- Monitoring and alerting runbook。
- Admin manual。
- User FAQ。

