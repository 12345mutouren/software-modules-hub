# API Foundation Package

`packages/api` is a dependency-light HTTP-style API layer over the data, auth, security and database-backed repository packages.

It does not have to start a server itself. Instead, it exposes a `handle(request)` function that accepts a plain request object and returns a plain response object. That keeps the API easy to test and lets a server adapter mount it into Node.js, Next.js, Fastify or another runtime.

Business logic lives in service objects under `src/services.mjs`; routes stay focused on request parsing, authentication and response shape.

## Routes

| Method | Path | Permission |
| --- | --- | --- |
| `GET` | `/health` | public |
| `POST` | `/auth/register` | public |
| `POST` | `/auth/login` | public |
| `GET` | `/me` | authenticated |
| `POST` | `/content` | `content:create` |
| `GET` | `/content` | `content:read:own` or `content:read:all` |
| `POST` | `/content/:id/review` | `content:review` |
| `POST` | `/exports` | `export:create` |
| `GET` | `/exports` | `export:create` |
| `GET` | `/audit-logs` | `audit:read` |

## Request Shape

```js
await api.handle({
  method: "POST",
  path: "/content",
  headers: { authorization: "Bearer session-token" },
  body: { title: "Post", body: "Body" },
});
```

## Run

```bash
npm --prefix packages/api test
```
