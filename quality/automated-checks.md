# Automated Checks

## Root Scripts

| Script | Purpose |
| --- | --- |
| `npm run verify` | Static repository structure verification |
| `npm run check:links` | Check local Markdown links |
| `npm run audit:freshness` | Check maintenance and catalog freshness prerequisites |
| `npm run test:examples` | Run the full-stack mini app test suite |
| `npm run test:module-demos` | Run the module demos test suite |
| `npm run test:starter-generator` | Run the starter generator test suite |
| `npm run test:runnable-templates` | Run runnable template tests |
| `npm run test:runnable-apps` | Run runnable app template tests |
| `npm run test:deployment-playground` | Run deployment playground smoke check |
| `npm run build:docs-site` | Build the productized static docs site |
| `npm run test:docs-site` | Run docs-site builder tests |
| `npm test` | Run all current automated checks |

## Verification Coverage

The verifier checks:

- Internal checklist and audit records.
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
- 6 showcase files.
- Starter generator files.
- Module demo files.
- Production template files.
- Security compliance files.
- Operations productionization files.
- GitHub professionalization files.
- Audit system files.
- v1.0 release files.
- v1.1 runnable template, deployment, docs-site and maintenance files.
- v1.2 runnable app and online audit files.
- Productized docs-site pages, assets and deployment workflow.
- Changelog.
- Full-stack mini app files.
- GitHub Actions workflows.

## CI Behavior

GitHub Actions workflow is enabled at:

```text
.github/workflows/verify.yml
.github/workflows/docs-site.yml
```

A copyable workflow template is also stored at:

```text
quality/github-actions-verify.yml
```

The verification workflow runs on:

- Push to `main`.
- Pull requests.

The docs-site workflow runs on push to `main` and manual dispatch.

The verification workflow uses Node.js 22 and runs:

```bash
npm test
```

Creating or updating `.github/workflows/*.yml` through GitHub requires a token with `workflow` scope.

## Extending Checks

When adding a new content set:

1. Add new required files to `tools/verify-repo.mjs`.
2. Update `quality/automated-checks.md` if the verification scope changes.
3. Run `npm test`.
4. Record any important verification result in the relevant maintenance notes.
