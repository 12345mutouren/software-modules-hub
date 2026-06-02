# 06 安全

安全模块回答：如何保护账号、数据、接口和运行环境，防止误用、滥用和攻击。

安全不是最后才加的功能。账号、数据库、后端、前端、部署、测试和文档都要体现安全边界。

## 核心能力

- 密码加密存储，不能明文保存。
- 登录状态管理：Session、JWT、Cookie。
- 防攻击：SQL 注入、XSS、CSRF、暴力破解、接口刷请求。
- 限流：验证码、登录失败限制、IP 限制。
- 数据权限：用户只能访问自己的数据。
- 日志审计：谁在什么时候做了什么。
- 隐私合规：用户数据删除、导出、授权、隐私政策。

## 密码和身份安全

| 类别 | 说明 |
| --- | --- |
| 密码哈希 | 使用 bcrypt、argon2、scrypt 等算法保存密码摘要 |
| 密码策略 | 长度、复杂度、泄露密码检查 |
| 密码重置 | 使用一次性、短期有效令牌 |
| 二次验证 | TOTP、短信、邮件、WebAuthn |
| Passkey | 使用 WebAuthn 的无密码登录 |
| 设备管理 | 查看并撤销登录设备 |
| 异常提醒 | 新设备、新地区、高风险行为提醒 |

## 会话管理类别

| 类别 | 说明 | 注意点 |
| --- | --- | --- |
| Session | 服务端保存登录状态 | 易撤销，依赖服务端存储 |
| JWT | Token 自包含身份信息 | 注意过期、撤销和泄露风险 |
| Cookie | 浏览器自动携带 | 设置 HttpOnly、Secure、SameSite |
| Refresh Token | 用于刷新访问令牌 | 需要轮换和泄露检测 |
| API Key | 给机器或第三方调用 | 需要权限范围、过期和撤销 |

## 常见攻击类别

| 攻击 | 风险 | 常见防护 |
| --- | --- | --- |
| SQL 注入 | 读取或修改数据库 | 参数化查询、ORM、输入校验 |
| XSS | 注入脚本窃取数据 | 输出转义、CSP、富文本清洗 |
| CSRF | 借用户身份发请求 | SameSite Cookie、CSRF Token |
| 暴力破解 | 猜密码或验证码 | 限流、验证码、登录失败锁定 |
| 接口刷请求 | 消耗资源或薅羊毛 | IP/用户限流、风控、队列 |
| 越权访问 | 看见或修改别人的数据 | 服务端权限校验、数据隔离 |
| 密钥泄露 | 攻击者使用 API 密钥 | secret scanning、密钥轮换 |
| 依赖漏洞 | 第三方包存在漏洞 | 依赖扫描、升级策略 |

## 隐私和合规

| 类别 | 说明 |
| --- | --- |
| 数据最小化 | 只收集必要数据 |
| 用户授权 | 明确用户同意和授权范围 |
| 数据导出 | 用户可导出自己的数据 |
| 数据删除 | 用户可删除或申请删除数据 |
| 隐私政策 | 说明数据用途和第三方共享 |
| 审计日志 | 记录敏感操作 |
| 数据保留 | 定义日志、订单、账号数据保留时间 |

## 常见数据

- 密码哈希。
- Session 或 Token。
- 登录失败记录。
- 验证码。
- API Key。
- 权限策略。
- 审计日志。
- 安全事件。
- 用户授权记录。

## 常见流程

1. 用户登录或访问接口。
2. 系统验证身份和会话。
3. 系统检查角色、权限和数据归属。
4. 系统执行输入校验、限流和风控。
5. 敏感操作写入审计日志。
6. 异常行为触发提醒、封禁或人工审核。

## 代表 GitHub 仓库

| 仓库 | 类型 | 适合学习 |
| --- | --- | --- |
| [OWASP/CheatSheetSeries](https://github.com/OWASP/CheatSheetSeries) | documentation | Web 安全最佳实践 |
| [juice-shop/juice-shop](https://github.com/juice-shop/juice-shop) | sample | 常见 Web 漏洞练习 |
| [zaproxy/zaproxy](https://github.com/zaproxy/zaproxy) | tooling | 动态安全扫描 |
| [gitleaks/gitleaks](https://github.com/gitleaks/gitleaks) | tooling | Git 密钥泄露扫描 |
| [trufflesecurity/trufflehog](https://github.com/trufflesecurity/trufflehog) | tooling | 密钥和敏感信息扫描 |
| [dependabot/dependabot-core](https://github.com/dependabot/dependabot-core) | tooling | 依赖更新和漏洞处理 |
| [apache/casbin](https://github.com/apache/casbin) | library | 权限模型 |
| [openfga/openfga](https://github.com/openfga/openfga) | platform | 关系型授权 |
| [auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | library | JWT 使用方式 |
| [panva/jose](https://github.com/panva/jose) | library | JOSE、JWT、JWK、JWS、JWE |

## 设计检查清单

- [ ] 密码是否使用安全哈希。
- [ ] Cookie 是否设置 HttpOnly、Secure、SameSite。
- [ ] 是否明确 Session/JWT 的过期和撤销策略。
- [ ] 是否所有接口都做服务端权限校验。
- [ ] 是否防止 SQL 注入、XSS 和 CSRF。
- [ ] 是否有限流和登录失败限制。
- [ ] 是否记录敏感操作审计日志。
- [ ] 是否有密钥管理和泄露扫描。
- [ ] 是否有数据导出、删除和隐私政策。
