# Auth Decision Tree

账号系统先回答三个问题：谁能登录、怎么登录、登录后能做什么。

## Step 1: Login Method

| 场景 | 推荐 |
| --- | --- |
| 普通 Web 产品 | 邮箱 + 密码 + OAuth |
| 开发者工具 | GitHub/Google OAuth + 邮箱 |
| 国内大众产品 | 手机验证码 + 微信登录 |
| 企业产品 | 企业 SSO + 邮箱邀请 |
| 高安全产品 | Passkey/WebAuthn + MFA |
| 低频工具 | Magic Link |

## Step 2: Registration Method

| 场景 | 推荐 |
| --- | --- |
| 开放产品 | 开放注册 |
| 内测产品 | 邀请注册 |
| 企业内部工具 | 管理员创建或 SSO 同步 |
| 高风险业务 | 审核通过后开通 |
| 付费产品 | 支付后开通或注册后升级 |

## Step 3: Permission Model

| 需求 | 推荐 |
| --- | --- |
| 只有普通用户和管理员 | 简单 RBAC |
| 多角色、多后台操作 | RBAC + 权限表 |
| 按部门、地区、等级控制 | ABAC |
| 团队、资源拥有者、协作者 | ReBAC |
| 企业多租户 | 组织/租户隔离 + RBAC |

## Repository Choices

| 需求 | 参考仓库 |
| --- | --- |
| Next.js 登录 | `nextauthjs/next-auth`、`better-auth/better-auth` |
| 企业身份 | `keycloak/keycloak`、`ory/kratos`、`logto-io/logto` |
| 权限模型 | `apache/casbin`、`openfga/openfga`、`Permify/permify` |

## Avoid This

- 不要明文保存密码。
- 不要只在前端做权限控制。
- 不要把管理员权限写死在 UI 里。
- 不要让 JWT 永不过期。
- 不要忽略登录失败限制和审计日志。

