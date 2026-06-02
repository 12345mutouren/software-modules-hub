# API Contract Template

## Base URL

```text
https://example.com/api
```

## Authentication

- Cookie Session
- JWT
- API Key

## Endpoints

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| GET | `/health` | None | Health check |
| GET | `/me` | User | Current user |
| POST | `/auth/register` | None | Register |
| POST | `/auth/login` | None | Login |

## Error Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

## Open Questions

- 

