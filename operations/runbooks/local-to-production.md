# Local To Production Runbook

这个 Runbook 描述从本地示例走向真实生产环境的基本路径。

## 1. Local

目标：开发者能在本地运行和测试。

检查：

- [ ] 有 README。
- [ ] 有 `.env.example`。
- [ ] 有本地启动命令。
- [ ] 有测试命令。
- [ ] 本地数据可以重置。
- [ ] 登录、注册、核心流程可以跑通。

## 2. Development Environment

目标：团队可以联调。

检查：

- [ ] 使用独立开发数据库。
- [ ] 使用非生产密钥。
- [ ] 支持测试账号。
- [ ] 日志可查看。
- [ ] 第三方 webhook 有测试环境。

## 3. Test/Staging Environment

目标：发布前验证真实配置。

检查：

- [ ] 环境变量接近生产。
- [ ] 数据库结构和生产一致。
- [ ] 有 E2E 测试。
- [ ] 有权限测试。
- [ ] 有支付、邮件、短信等测试替身或沙箱。
- [ ] 有回滚演练。

## 4. Production Environment

目标：真实用户访问。

检查：

- [ ] 域名和 HTTPS 已配置。
- [ ] 数据库有备份。
- [ ] 密钥使用安全存储。
- [ ] 日志、错误、性能监控已接入。
- [ ] 报警能通知到负责人。
- [ ] 有发布和回滚流程。
- [ ] 有事故响应流程。

## Environment Matrix

| Capability | Local | Development | Staging | Production |
| --- | --- | --- | --- | --- |
| Database | Local or test file | Dev database | Staging database | Production database |
| Secrets | `.env` | Secret manager | Secret manager | Secret manager |
| Payment | Mock | Sandbox | Sandbox | Live provider |
| Email/SMS | Console/test inbox | Test provider | Sandbox | Live provider |
| Monitoring | Optional | Basic logs | Full logs | Full logs and alerts |
| Backups | Optional | Optional | Test restore | Required |

