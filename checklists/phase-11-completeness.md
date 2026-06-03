# 第十一阶段完成度清单

第十一阶段目标：新增项目生成器，让仓库可以按软件类型生成项目启动包。

## 生成器要求

- [x] 有 starter-generator 入口。
- [x] 支持列出可生成的软件类型。
- [x] 支持 SaaS 订阅系统。
- [x] 支持管理后台。
- [x] 支持电商系统。
- [x] 支持内容社区。
- [x] 支持 AI 知识库。
- [x] 支持企业内部工具。
- [x] 生成产品简报。
- [x] 生成模块选择。
- [x] 生成权限矩阵。
- [x] 生成数据模型。
- [x] 生成 API 合同。
- [x] 生成安全审查。
- [x] 生成测试计划。
- [x] 生成发布计划。
- [x] 生成风险登记。

## 验证要求

- [x] README 已加入第十一阶段入口。
- [x] Roadmap 已加入第十一阶段状态。
- [x] Master Index 已加入项目生成器入口。
- [x] 自动验证脚本覆盖 starter-generator。
- [x] 根级 `npm test` 覆盖生成器测试。
- [x] 有第十一阶段审计记录。

## 文件覆盖

| 类型 | 文件 |
| --- | --- |
| 生成器入口 | `starter-generator/README.md` |
| 生成器 CLI | `starter-generator/create-starter.mjs` |
| 生成器测试 | `starter-generator/test/create-starter.test.mjs` |
| 审计 | `audits/phase-11-audit-1.md` |

