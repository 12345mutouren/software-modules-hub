# Automated Checks

## Root Scripts

| Script | Purpose |
| --- | --- |
| `npm run verify` | Static repository structure verification |
| `npm run test:examples` | Run the full-stack mini app test suite |
| `npm test` | Run all current automated checks |

## Verification Coverage

The verifier checks:

- Phase 1-9 checklist and audit files.
- 10 module documents.
- Required module sections.
- 6 complete app templates.
- Required template sections.
- 6 real project case studies.
- Required case study sections.
- 6 Mermaid architecture diagrams.
- 6 operations runbooks.
- 7 decision guide files.
- 10 project kickoff templates.
- 6 learning path files.
- 7 reference files.
- Full-stack mini app files.
- GitHub Actions workflow.

## CI Behavior

GitHub Actions workflow is enabled at:

```text
.github/workflows/verify.yml
```

A copyable workflow template is also stored at:

```text
quality/github-actions-verify.yml
```

GitHub Actions runs on:

- Push to `main`.
- Pull requests.

The workflow uses Node.js 22 and runs:

```bash
npm test
```

Creating or updating `.github/workflows/*.yml` through GitHub requires a token with `workflow` scope.

## Extending Checks

When adding a new phase:

1. Add the new checklist and audit files.
2. Add new required files to `tools/verify-repo.mjs`.
3. Run `npm test`.
4. Update the phase audit with the verification result.
