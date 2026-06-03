# Starter Generator

第十一阶段项目生成器。

目标：把仓库中的软件类型、模块地图和项目启动模板连接起来，生成一套可以直接进入讨论和实现的项目启动包。

## Supported Types

| Type | Output |
| --- | --- |
| `saas-subscription` | SaaS 订阅系统启动包 |
| `admin-dashboard` | 管理后台启动包 |
| `ecommerce` | 电商系统启动包 |
| `content-community` | 内容社区启动包 |
| `ai-knowledge-base` | AI 知识库启动包 |
| `enterprise-internal-tool` | 企业内部工具启动包 |

## Usage

List available types:

```bash
node starter-generator/create-starter.mjs --list
```

Generate a starter:

```bash
node starter-generator/create-starter.mjs --type saas-subscription --out ./generated/my-saas
```

Overwrite generated starter files in a non-empty directory:

```bash
node starter-generator/create-starter.mjs --type ecommerce --out ./generated/shop --force
```

## Generated Files

| File | Purpose |
| --- | --- |
| `README.md` | 项目启动包总览 |
| `docs/product-brief.md` | 产品目标、用户、功能、页面和指标 |
| `docs/module-selection.md` | 10 大模块的默认选择 |
| `docs/permission-matrix.md` | 角色、资源和权限范围 |
| `docs/data-model.md` | 初始数据表和字段建议 |
| `docs/api-contract.md` | 初始 API 合同 |
| `docs/security-review.md` | 账号、权限、攻击防护和隐私检查 |
| `docs/test-plan.md` | 单元、接口、页面、安全和性能测试计划 |
| `docs/launch-plan.md` | 环境、发布、冒烟测试和回滚计划 |
| `docs/risk-register.md` | 项目风险登记 |

## Test

```bash
npm run test:starter-generator
```

The generator has no third-party dependencies and is covered by Node.js built-in tests.

