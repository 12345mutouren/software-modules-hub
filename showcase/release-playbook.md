# Release Playbook

这份手册用于每次新增阶段、更新仓库结构或准备对外发布。

## Release Inputs

| Input | Required |
| --- | --- |
| 阶段目标 | Yes |
| 新增文件列表 | Yes |
| README 入口 | Yes |
| Roadmap 状态 | Yes |
| Checklist | Yes |
| Audit | Yes |
| Verifier 覆盖 | Yes |
| Local test result | Yes |
| GitHub Actions result | Yes |
| Changelog entry | Yes |

## Pre-Release Checklist

- [ ] 工作区是预期状态，没有无关改动。
- [ ] 新阶段有明确目标和范围。
- [ ] 新文件能从 README、Roadmap 或 Master Index 找到。
- [ ] `tools/verify-repo.mjs` 覆盖关键文件。
- [ ] `quality/automated-checks.md` 说明新的验证范围。
- [ ] `checklists/phase-N-completeness.md` 已创建。
- [ ] `audits/phase-N-audit-1.md` 已创建。
- [ ] `CHANGELOG.md` 已更新。
- [ ] `npm test` 本地通过。
- [ ] `git diff --check` 本地通过。

## Release Commands

```bash
npm test
git diff --check
git status --short --branch
git add .
git commit -m "Add phase N ..."
git push
gh run list --workflow Verify --limit 1
gh run watch <run-id> --exit-status
```

## Audit Template

Each phase audit should record:

- Date.
- Scope.
- Files checked.
- Local verification result.
- Markdown whitespace result.
- Remaining risks.
- Decision.

## Post-Release Checklist

- [ ] Remote branch is synced with `origin/main`.
- [ ] GitHub Actions completed successfully.
- [ ] Latest commit hash is recorded in the handoff or final summary.
- [ ] Run URL is recorded in the handoff or final summary.
- [ ] Any known limitations are stated plainly.

## Versioning Rule

Use phase-based minor versions:

| Phase | Version |
| --- | --- |
| Phase 7 | `0.7.0` |
| Phase 8 | `0.8.0` |
| Phase 9 | `0.9.0` |
| Phase 10 | `0.10.0` |
| Phase 11 | `0.11.0` |
| Phase 12 | `0.12.0` |
| Phase 13 | `0.13.0` |
| Phase 14 | `0.14.0` |
| Phase 15 | `0.15.0` |
| Phase 16 | `0.16.0` |
| Phase 17 | `0.17.0` |
| Phase 18 | `1.0.0` |
| Phase 19-24 | `1.1.0` |
| Phase 25-30 | `1.2.0` |

Patch versions can be used for small corrections that do not add a new phase.
