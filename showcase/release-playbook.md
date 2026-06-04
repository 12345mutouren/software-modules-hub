# Release Playbook

这份手册用于更新仓库结构、准备版本发布或对外同步发布材料。

## Release Inputs

| Input | Required |
| --- | --- |
| 发布目标 | Yes |
| 新增文件列表 | Yes |
| 公开入口 | Yes |
| 质量验证范围 | Yes |
| Verifier 覆盖 | Yes |
| Local test result | Yes |
| GitHub Actions result | Yes |
| Changelog entry | Yes |

## Pre-Release Checklist

- [ ] 工作区是预期状态，没有无关改动。
- [ ] 本次发布有明确目标和范围。
- [ ] 面向读者的新内容能从 README、START-HERE 或 Master Index 找到。
- [ ] `tools/verify-repo.mjs` 覆盖关键文件。
- [ ] `quality/automated-checks.md` 说明新的验证范围。
- [ ] `CHANGELOG.md` 已更新。
- [ ] `npm test` 本地通过。
- [ ] `git diff --check` 本地通过。

## Release Commands

```bash
npm test
git diff --check
git status --short --branch
git add .
git commit -m "Update public repository experience"
git push
gh run list --workflow Verify --limit 1
gh run watch <run-id> --exit-status
```

## Quality Review Notes

Each release review should record:

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

Use semantic versions for public releases:

| Change | Version |
| --- | --- |
| Documentation cleanup, navigation polish or small fixes | Patch |
| New reusable templates, demos or maintenance systems | Minor |
| Large structure change or incompatible repository layout change | Major |
