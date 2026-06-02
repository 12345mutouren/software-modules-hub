# Data Model Template

## Core Entities

| Entity | Description | Owner |
| --- | --- | --- |
| users | User accounts | Account system |
| audit_logs | Sensitive operation logs | Security |

## Tables

### users

| Field | Type | Notes |
| --- | --- | --- |
| id | text/uuid | Primary key |
| email | text | Unique |
| created_at | timestamp |  |

### audit_logs

| Field | Type | Notes |
| --- | --- | --- |
| id | text/uuid | Primary key |
| actor_id | text/uuid | User who acted |
| action | text | What happened |
| target_id | text/uuid | Target resource |
| created_at | timestamp |  |

## Indexes

| Table | Index | Why |
| --- | --- | --- |
| users | email unique | Login lookup |

## Data Retention

| Data | Retention |
| --- | --- |
| Audit logs |  |
| Deleted users |  |

