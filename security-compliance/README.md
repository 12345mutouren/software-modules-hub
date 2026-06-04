# Security Compliance

第十四阶段安全与合规强化。

目标：让仓库不只说明“要安全”，而是提供可执行的威胁建模、OWASP 检查、隐私数据流程、权限复核和安全测试模板。

## Files

| File | Purpose |
| --- | --- |
| [threat-model-template.md](threat-model-template.md) | 威胁模型模板 |
| [owasp-checklist.md](owasp-checklist.md) | OWASP 风险检查清单 |
| [privacy-data-rights.md](privacy-data-rights.md) | 用户数据导出、删除和授权流程 |
| [access-review.md](access-review.md) | 权限复核模板 |
| [security-test-plan.md](security-test-plan.md) | 安全测试计划 |

## Security Principle

- Authenticate first.
- Authorize every protected resource.
- Validate every input.
- Log sensitive actions.
- Minimize stored personal data.
- Make deletion and export flows explicit.
- Treat security as a release gate, not a final polish step.

