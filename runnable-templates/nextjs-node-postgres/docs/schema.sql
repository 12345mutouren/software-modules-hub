create table users (
  id text primary key,
  email text not null unique,
  password_hash text not null,
  role text not null,
  created_at timestamptz not null default now()
);

create table audit_logs (
  id text primary key,
  actor_id text references users(id),
  action text not null,
  resource_type text not null,
  resource_id text,
  created_at timestamptz not null default now()
);

