# Deployment

## Local

```bash
npm start
```

Environment variables:

| Name | Default | Description |
| --- | --- | --- |
| `PORT` | `3000` | HTTP port |
| `DATA_FILE` | `./data/app.json` | JSON data file |

## Docker

```bash
docker compose up --build
```

Health check:

```bash
curl http://localhost:3000/api/health
```

## Recovery

The example stores data in a JSON file. To back up data, copy the file configured by `DATA_FILE`.

For production software, replace this with:

- PostgreSQL or MySQL backup.
- Object storage backup policy.
- Restore drill.
- Rollback strategy.

