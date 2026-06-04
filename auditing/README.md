# Auditing

第十七阶段完整审计体系。

目标：让仓库后续可以按固定维度复查，而不是只在新增阶段时临时检查。

## Audit Types

| Audit | Purpose |
| --- | --- |
| [content-audit.md](content-audit.md) | 内容准确性、重复和覆盖范围 |
| [link-audit.md](link-audit.md) | 本地链接和入口完整性 |
| [github-repository-audit.md](github-repository-audit.md) | 代表 GitHub 仓库复核 |
| [example-code-audit.md](example-code-audit.md) | 示例代码可运行性和测试 |
| [security-audit.md](security-audit.md) | 安全指导和示例风险 |
| [structure-audit.md](structure-audit.md) | 阶段、目录和 verifier 覆盖 |

## Automated Support

The local link checker lives at:

```bash
node tools/check-local-links.mjs
```

Root `npm test` includes this check.

