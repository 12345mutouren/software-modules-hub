# Web Admin App

This app turns the data/API foundation into a browser-usable management surface.

It serves static HTML, CSS and JavaScript, then proxies `/api/*` requests into `packages/api`. The default demo seeds an admin user and a writer user so the app can be opened and exercised without external setup.

## Demo Accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@example.com` | `StrongPass123` |
| Writer | `writer@example.com` | `StrongPass123` |

## Features

- Login.
- Current session panel.
- Content creation.
- Content review.
- Export job creation and listing.
- Audit log listing.
- Permission-aware API errors.

## Run

```bash
npm --prefix apps/web-admin-app start
```

Then open:

```text
http://localhost:4310
```

To keep demo data after restart, point the app at a local database file:

```bash
DATA_FILE=.local/web-admin.sqlite npm --prefix apps/web-admin-app start
```

Use a `.json` file extension if you want the lightweight JSON adapter instead.

## Test

```bash
npm --prefix apps/web-admin-app test
```
