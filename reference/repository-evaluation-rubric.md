# Repository Evaluation Rubric

看到一个 GitHub 仓库时，用这个 rubric 判断它是否值得学习、接入或自托管。

## Scorecard

| Area | Questions | Score |
| --- | --- | --- |
| Fit | 它解决的问题是否正好匹配你的模块需求？ | 1-5 |
| Maintenance | 最近是否仍在维护？issue/PR 是否活跃？ | 1-5 |
| Documentation | README、安装、API、部署文档是否清楚？ | 1-5 |
| Tests | 是否有测试、CI、示例？ | 1-5 |
| Security | 是否有 SECURITY、权限边界、依赖更新？ | 1-5 |
| Community | 是否有用户、贡献者、生态和案例？ | 1-5 |
| Complexity | 是否在你的团队可维护范围内？ | 1-5 |
| License | license 是否允许你的使用场景？ | 1-5 |

## Recommendation

| Total | Meaning |
| --- | --- |
| 32-40 | 可以深入学习或考虑生产使用 |
| 24-31 | 可以学习，生产使用前需要验证 |
| 16-23 | 只适合参考概念或局部代码 |
| 0-15 | 暂时不要依赖 |

## Red Flags

- 没有文档。
- 没有测试或 CI。
- 长期无人维护。
- issue 里大量生产故障没有回应。
- 安全边界不清楚。
- 部署说明过时。
- license 不适合你的项目。
- 需要大量你不理解的基础设施。

## Green Flags

- 有清楚的 README 和 examples。
- 有活跃发布记录。
- 有测试和 CI。
- 有 SECURITY.md。
- 有迁移、部署和升级文档。
- 有真实用户或案例。
- 有明确的模块边界。

