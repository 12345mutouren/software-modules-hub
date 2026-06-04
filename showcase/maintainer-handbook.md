# Maintainer Handbook

这份手册用于长期维护仓库质量。

## Maintenance Principles

- 每个新增内容都要服务于“完整软件模块地图”这个主目标。
- 面向读者的新内容必须有公开入口、适用场景和自动校验覆盖。
- GitHub 仓库索引要区分库、框架、模板、平台、真实产品源码和学习示例。
- 真实项目案例要说明可学习点，也要说明风险和限制。
- 决策指南要帮助做选择，不要假装存在唯一正确答案。
- 示例代码要优先保持可运行、可测试、可解释。

## Content Quality Bar

| Area | Quality Bar |
| --- | --- |
| Module docs | 有类别、使用场景、数据、流程、仓库和检查清单 |
| Templates | 能映射 10 个模块，并说明数据、API、页面和关键检查 |
| Case studies | 有快照、模块地图、源码入口、学习点和风险 |
| Runbooks | 有触发条件、步骤、验证和回滚或恢复方式 |
| Decision guides | 有选择条件、默认建议和避免过度工程化提醒 |
| Learning paths | 有目标读者、学习顺序、练习和自评 |
| Reference files | 能快速查找，不和深度文档重复过多 |
| Showcase files | 能对外解释仓库，不夸大成熟度 |

## Change Policy

Small corrections:

- 修正文案、链接、错别字。
- 不需要新增版本。
- 运行 `npm test`。

New content set:

- 新增多个相关文件或一个新目录。
- 需要 README、START-HERE 或 Master Index 入口。
- 需要 verifier 覆盖。

Major restructure:

- 改目录结构、公开导航或核心分类。
- 需要先写 ADR。
- 需要检查所有入口链接和质量门。

## Review Checklist

- [ ] 新内容是否能从仓库入口找到？
- [ ] 是否重复已有文件而没有增加新价值？
- [ ] 是否把临时偏好写成了通用规则？
- [ ] 是否说明了适用场景和限制？
- [ ] 是否更新了自动验证？
- [ ] 是否更新了 Changelog？
- [ ] 是否通过本地测试？

## Known Maintenance Risks

- 代表 GitHub 仓库会随时间变化，需要定期复核。
- 技术选型对比可能过期，需要标记为学习参考。
- 示例应用为了保持简单，不覆盖所有生产级依赖和第三方服务。
- 随着内容增加，README 可能变长，需要持续优化入口而不是堆列表。
