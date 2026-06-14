# API Foundation Package

`packages/api` is a dependency-light HTTP-style API layer over the data, auth and security packages.

It does not start a server yet. Instead, it exposes a `handle(request)` function that accepts a plain request object and returns a plain response object. That keeps the API easy to test and later lets a real server adapter mount it into Node.js, Next.js, Fastify or another runtime.

## Routes

| Method | Path | Permission |
| --- | --- | --- |
| `GET` | `/health` | public |
| `POST` | `/auth/register` | public |
| `POST` | `/auth/login` | public |
| `POST` | `/content` | `content:create` |
| `POST` | `/content/:id/review` | `content:review` |
| `POST` | `/exports` | `export:create` |
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
