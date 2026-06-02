# Permission Matrix Template

## Roles

| Role | Description |
| --- | --- |
| Visitor | Not logged in |
| User | Normal authenticated user |
| Admin | System administrator |

## Matrix

| Resource / Action | Visitor | User | Admin |
| --- | --- | --- | --- |
| View public page | Allow | Allow | Allow |
| View own profile | Deny | Allow | Allow |
| Edit own profile | Deny | Allow | Allow |
| View all users | Deny | Deny | Allow |
| Delete user | Deny | Deny | Allow |

## Rules

- Every backend route must enforce this matrix.
- Frontend visibility is not a security boundary.
- Sensitive admin operations must write audit logs.

