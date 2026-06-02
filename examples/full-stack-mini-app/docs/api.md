# API Documentation

Base URL:

```text
http://localhost:3000
```

## Authentication

注册和登录成功后，服务端会设置 `mini_sid` Cookie，并返回 `csrfToken`。

所有已登录的写操作都需要请求头：

```text
x-csrf-token: <csrfToken>
```

## Endpoints

### GET /api/health

返回服务健康状态。

### GET /api/me

返回当前用户和 CSRF Token。未登录时 `user` 为 `null`。

### GET /api/plans

返回会员计划。

### POST /api/register

请求：

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123"
}
```

说明：

- 第一个注册用户成为 `admin`。
- 后续用户成为 `user`。
- 密码至少 8 位。

### POST /api/login

请求：

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### POST /api/logout

需要登录和 CSRF Token。

### GET /api/orders

需要登录。返回当前用户自己的订单。

### POST /api/orders

需要登录和 CSRF Token。

请求：

```json
{
  "planId": "pro"
}
```

### POST /api/feedback

需要登录和 CSRF Token。

请求：

```json
{
  "message": "This example is useful."
}
```

### GET /api/admin/users

需要管理员角色。

