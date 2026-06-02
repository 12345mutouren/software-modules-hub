# 02 账号系统

账号系统回答：谁可以进入软件，以什么身份进入，能做什么，账号丢失或被攻击时如何处理。

它连接产品层、数据库、后端、前端、安全、运营和文档，是绝大多数 Web 软件的基础模块。

## 核心能力

- 登录：让已有用户证明身份。
- 注册：创建新账号或加入组织。
- 账号安全：验证邮箱/手机、重置密码、二次验证、异常提醒。
- 用户资料：保存用户展示信息和偏好。
- 权限系统：控制用户能访问哪些数据和功能。

## 登录方式类别

| 类别 | 说明 | 适合场景 |
| --- | --- | --- |
| 账号密码 | 用户名/邮箱/手机号 + 密码 | 最常见，必须做好密码安全 |
| 手机号验证码 | 短信验证码登录 | 国内产品、低门槛登录 |
| 邮箱验证码 | 邮件验证码登录 | B2B、开发者工具、低频登录 |
| OAuth 登录 | Google、GitHub、微信等第三方登录 | 降低注册成本，依赖第三方身份 |
| 企业 SSO | SAML、OIDC、LDAP、企业身份提供方 | 企业客户、组织管理 |
| Magic Link | 邮件中的一次性登录链接 | 不想让用户记密码的产品 |
| Passkey | WebAuthn、生物识别、硬件密钥 | 高安全、现代无密码登录 |

## 注册方式类别

| 类别 | 说明 | 适合场景 |
| --- | --- | --- |
| 开放注册 | 任何人可注册 | 大众产品、社区、工具 |
| 邀请注册 | 需要邀请码或邀请链接 | 内测、团队协作、私有社区 |
| 管理员创建 | 管理员在后台创建账号 | 企业后台、内部系统 |
| 审核通过 | 用户提交资料后等待审核 | 教育、金融、招聘、实名场景 |
| 付费后注册 | 支付成功后创建账号或开通权益 | 课程、会员、SaaS |
| 游客转正式账号 | 先试用，再绑定账号 | 游戏、工具、AI 产品 |

## 账号安全类别

| 类别 | 说明 |
| --- | --- |
| 邮箱验证 | 确认邮箱可用，减少虚假账号 |
| 手机号验证 | 确认手机号可用，用于通知或找回 |
| 密码重置 | 通过邮箱、手机或管理员流程重设密码 |
| 二次验证 | TOTP、短信、邮件、WebAuthn |
| 登录设备管理 | 查看和撤销登录设备 |
| 异常登录提醒 | 新设备、新地区、高风险行为通知 |
| 登录失败限制 | 防暴力破解和撞库 |

## 用户资料

- 基础资料：头像、昵称、用户名、邮箱、手机号。
- 公开资料：个人简介、主页、社交链接。
- 偏好设置：语言、时区、通知、主题。
- 账号状态：正常、未验证、禁用、删除中。
- 组织关系：所属团队、角色、邀请状态。

## 权限系统类别

| 类别 | 说明 | 例子 |
| --- | --- | --- |
| RBAC | 基于角色控制权限 | 普通用户、管理员、超级管理员 |
| ABAC | 基于属性判断权限 | 部门、地区、账号等级、数据状态 |
| ReBAC | 基于关系判断权限 | 团队成员、资源拥有者、协作者 |
| 多租户权限 | 不同组织的数据隔离 | 企业 A 不能看企业 B 的数据 |
| 功能权限 | 控制是否能使用某功能 | 只读用户、导出权限、审核权限 |
| 数据权限 | 控制能访问哪些数据 | 只能访问自己的订单 |

## 常见数据表

- users：用户账号。
- profiles：用户资料。
- sessions：登录会话。
- accounts：第三方登录账号绑定。
- verification_tokens：邮箱/手机验证码。
- password_reset_tokens：密码重置令牌。
- roles：角色。
- permissions：权限。
- user_roles：用户角色关系。
- organizations：组织或团队。
- organization_members：组织成员。
- audit_logs：账号和权限操作日志。

## 常见流程

1. 用户提交登录或注册信息。
2. 后端校验输入、验证码和风险状态。
3. 系统创建用户、会话或第三方账号绑定。
4. 系统写入登录记录和审计日志。
5. 前端根据角色和权限展示对应入口。
6. 后续请求携带 Session、Cookie 或 Token。

## 代表 GitHub 仓库

| 仓库 | 类型 | 适合学习 |
| --- | --- | --- |
| [nextauthjs/next-auth](https://github.com/nextauthjs/next-auth) | library | Web 应用常见 OAuth、邮件登录和会话管理 |
| [better-auth/better-auth](https://github.com/better-auth/better-auth) | library | TypeScript 账号系统设计 |
| [keycloak/keycloak](https://github.com/keycloak/keycloak) | platform | 企业级 SSO、OIDC、SAML、用户联合 |
| [ory/kratos](https://github.com/ory/kratos) | platform | 身份、注册、登录、自服务账号流程 |
| [supertokens/supertokens-core](https://github.com/supertokens/supertokens-core) | platform | 登录注册、会话和多种认证方式 |
| [logto-io/logto](https://github.com/logto-io/logto) | platform | 现代身份平台和登录体验 |
| [casdoor/casdoor](https://github.com/casdoor/casdoor) | platform | SSO、OAuth、OIDC、用户管理 |
| [apache/casbin](https://github.com/apache/casbin) | library | RBAC、ABAC 权限模型 |
| [openfga/openfga](https://github.com/openfga/openfga) | platform | 关系型权限 ReBAC |
| [Permify/permify](https://github.com/Permify/permify) | platform | 授权服务和关系权限 |

## 设计检查清单

- [ ] 是否选择了登录方式。
- [ ] 是否选择了注册方式。
- [ ] 是否有邮箱/手机验证策略。
- [ ] 是否有密码重置和账号恢复流程。
- [ ] 是否有二次验证或高风险行为处理。
- [ ] 是否定义用户资料字段。
- [ ] 是否定义角色和权限。
- [ ] 是否记录登录和权限变更日志。
- [ ] 是否明确 Session、JWT、Cookie 的使用方式。
