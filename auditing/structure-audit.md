# Structure Audit

## Checks

| Area | Check |
| --- | --- |
| Phase files | Every phase has checklist and audit |
| Root entries | README links to current major directories |
| Roadmap | Roadmap includes current phase status |
| Changelog | New phase has entry |
| Verifier | `tools/verify-repo.mjs` covers required files |
| Quality docs | New scripts and checks are documented |
| GitHub Actions | Workflow still runs `npm test` |

## Command

```bash
npm run verify
```

## Release Rule

The structure audit must pass before tagging a release.

