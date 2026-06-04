# GitHub Repository Index Online Audit

Date: 2026-06-04

Source: GitHub REST API through `gh api repos/{owner}/{repo}`.

Scope: representative sample across complete templates, real product source, platforms, auth, database, frontend, backend, deployment, testing, business operations and documentation.

## Results

| Repository | Archived | Disabled | Default Branch | License | Stars | Pushed At | Updated At | Decision |
| --- | --- | --- | --- | --- | ---: | --- | --- | --- |
| nextjs/saas-starter | false | false | main | MIT | 15856 | 2025-12-11 | 2026-06-04 | Keep |
| calcom/cal.diy | false | false | main | MIT | 45051 | 2026-06-03 | 2026-06-04 | Keep |
| makeplane/plane | false | false | preview | AGPL-3.0 | 50248 | 2026-06-03 | 2026-06-04 | Keep |
| supabase/supabase | false | false | master | Apache-2.0 | 103426 | 2026-06-04 | 2026-06-04 | Keep |
| appwrite/appwrite | false | false | 1.9.x | BSD-3-Clause | 56209 | 2026-06-04 | 2026-06-04 | Keep |
| nextauthjs/next-auth | false | false | main | ISC | 28268 | 2026-04-14 | 2026-06-04 | Keep |
| prisma/prisma | false | false | main | Apache-2.0 | 46061 | 2026-06-03 | 2026-06-04 | Keep |
| vercel/next.js | false | false | canary | MIT | 139668 | 2026-06-04 | 2026-06-04 | Keep |
| fastapi/fastapi | false | false | master | MIT | 98868 | 2026-06-04 | 2026-06-04 | Keep |
| docker/compose | false | false | main | Apache-2.0 | 37475 | 2026-06-03 | 2026-06-04 | Keep |
| microsoft/playwright | false | false | main | Apache-2.0 | 90228 | 2026-06-04 | 2026-06-04 | Keep |
| stripe-samples/accept-a-payment | false | false | main | MIT | 832 | 2026-05-12 | 2026-05-25 | Keep |
| facebook/docusaurus | false | false | main | MIT | 65097 | 2026-06-02 | 2026-06-04 | Keep |

## Findings

- No sampled repository is archived.
- No sampled repository is disabled.
- All sampled repositories remain public.
- All sampled repositories expose a license identifier.
- `nextjs/saas-starter` has the oldest sampled `pushed_at` date, but it is still updated and remains useful as a starter reference.
- Default branch names vary. Case studies and source-reading notes should not assume every repository uses `main`.

## Follow-Up

- Continue quarterly full catalog freshness checks.
- For future full online audits, parse every GitHub URL from `catalog/github-repositories.md`.
- Keep manual interpretation separate from automated existence checks.

