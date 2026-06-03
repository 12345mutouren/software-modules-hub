import crypto from "node:crypto";

export function planProductFlow({ users, features, entryPoint }) {
  if (!Array.isArray(users) || users.length === 0) {
    throw new Error("At least one user type is required.");
  }

  if (!Array.isArray(features) || features.length === 0) {
    throw new Error("At least one feature is required.");
  }

  const primaryUser = users[0];
  const primaryFeature = features[0];

  return {
    targetUser: primaryUser,
    entryPoint,
    steps: [
      `${primaryUser} enters through ${entryPoint}`,
      `${primaryUser} signs in or continues as allowed`,
      `${primaryUser} uses ${primaryFeature}`,
      "System records success metric and audit event",
      `${primaryUser} receives next recommended action`,
    ],
    successMetrics: features.map((feature) => `${feature}: completed_count`),
  };
}

export function createAccountSystem() {
  const users = new Map();
  const sessions = new Map();
  const resetTokens = new Map();

  function register({ email, password, role = "user" }) {
    assertEmail(email);
    assertPassword(password);

    const normalizedEmail = email.toLowerCase();
    if (users.has(normalizedEmail)) {
      throw new Error("User already exists.");
    }

    const user = {
      id: `usr_${users.size + 1}`,
      email: normalizedEmail,
      passwordHash: hashSecret(password),
      role,
      verified: false,
    };

    users.set(normalizedEmail, user);
    return publicUser(user);
  }

  function verifyEmail(email) {
    const user = requireUser(email);
    user.verified = true;
    return publicUser(user);
  }

  function login({ email, password }) {
    const user = requireUser(email);
    if (user.passwordHash !== hashSecret(password)) {
      throw new Error("Invalid credentials.");
    }

    const token = `ses_${crypto.randomBytes(8).toString("hex")}`;
    sessions.set(token, {
      token,
      userId: user.id,
      email: user.email,
      createdAt: new Date().toISOString(),
    });

    return { token, user: publicUser(user) };
  }

  function startPasswordReset(email) {
    const user = requireUser(email);
    const token = `rst_${crypto.randomBytes(8).toString("hex")}`;
    resetTokens.set(token, user.email);
    return token;
  }

  function resetPassword({ token, newPassword }) {
    assertPassword(newPassword);
    const email = resetTokens.get(token);
    if (!email) {
      throw new Error("Invalid reset token.");
    }

    const user = requireUser(email);
    user.passwordHash = hashSecret(newPassword);
    resetTokens.delete(token);
    return publicUser(user);
  }

  function requireSession(token) {
    const session = sessions.get(token);
    if (!session) {
      throw new Error("Invalid session.");
    }
    return session;
  }

  function requireUser(email) {
    const user = users.get(email.toLowerCase());
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  }

  return {
    register,
    verifyEmail,
    login,
    startPasswordReset,
    resetPassword,
    requireSession,
    countUsers: () => users.size,
  };
}

export function createInMemoryDatabase(schema) {
  const tables = new Map();
  const indexes = new Map();

  for (const table of schema) {
    tables.set(table.name, []);
    indexes.set(table.name, new Map());
  }

  function insert(tableName, row) {
    const table = requireTable(tableName);
    const id = row.id || `${tableName}_${table.length + 1}`;
    const nextRow = {
      ...row,
      id,
      createdAt: row.createdAt || new Date().toISOString(),
    };

    table.push(nextRow);
    addIndexes(tableName, nextRow);
    return nextRow;
  }

  function findById(tableName, id) {
    return requireTable(tableName).find((row) => row.id === id) || null;
  }

  function where(tableName, field, value) {
    const tableIndex = indexes.get(tableName);
    const fieldIndex = tableIndex?.get(field);
    if (fieldIndex?.has(value)) {
      return [...fieldIndex.get(value)];
    }

    return requireTable(tableName).filter((row) => row[field] === value);
  }

  function transaction(callback) {
    const snapshot = new Map([...tables.entries()].map(([name, rows]) => [name, rows.map((row) => ({ ...row }))]));

    try {
      return callback({ insert, findById, where });
    } catch (error) {
      tables.clear();
      indexes.clear();
      for (const [name, rows] of snapshot.entries()) {
        tables.set(name, rows);
        indexes.set(name, new Map());
        rows.forEach((row) => addIndexes(name, row));
      }
      throw error;
    }
  }

  function requireTable(tableName) {
    const table = tables.get(tableName);
    if (!table) {
      throw new Error(`Unknown table: ${tableName}`);
    }
    return table;
  }

  function addIndexes(tableName, row) {
    const tableIndex = indexes.get(tableName);
    for (const [field, value] of Object.entries(row)) {
      if (value === undefined || value === null) continue;
      if (!tableIndex.has(field)) {
        tableIndex.set(field, new Map());
      }
      const fieldIndex = tableIndex.get(field);
      if (!fieldIndex.has(value)) {
        fieldIndex.set(value, []);
      }
      fieldIndex.get(value).push(row);
    }
  }

  return {
    insert,
    findById,
    where,
    transaction,
    count: (tableName) => requireTable(tableName).length,
  };
}

export function createApiRouter({ accountSystem, permissionSystem }) {
  const routes = new Map();

  function addRoute(method, path, handler, options = {}) {
    routes.set(`${method.toUpperCase()} ${path}`, { handler, options });
  }

  function handle({ method, path, token, body = {} }) {
    const route = routes.get(`${method.toUpperCase()} ${path}`);
    if (!route) {
      return response(404, { error: "Not found" });
    }

    try {
      let session = null;
      if (route.options.auth) {
        session = accountSystem.requireSession(token);
      }

      if (route.options.permission) {
        permissionSystem.assertAllowed(session.userId, route.options.permission, body.resource);
      }

      return response(200, route.handler({ session, body }));
    } catch (error) {
      return response(400, { error: error.message });
    }
  }

  return { addRoute, handle };
}

export function createFrontendState(initialState = {}) {
  let state = {
    loading: false,
    error: null,
    page: 1,
    filters: {},
    records: [],
    ...initialState,
  };
  const listeners = new Set();

  function setState(patch) {
    state = { ...state, ...patch };
    for (const listener of listeners) {
      listener(getState());
    }
    return getState();
  }

  function getState() {
    return {
      ...state,
      filters: { ...state.filters },
      records: state.records.map((record) => ({ ...record })),
    };
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function applyFilter(key, value) {
    return setState({
      page: 1,
      filters: { ...state.filters, [key]: value },
    });
  }

  function setRecords(records) {
    return setState({ loading: false, error: null, records });
  }

  return { getState, setState, subscribe, applyFilter, setRecords };
}

export function createSecurityControls({ maxAttempts = 3 } = {}) {
  const attempts = new Map();
  const csrfTokens = new Set();

  function escapeHtml(input) {
    return String(input)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function recordLoginFailure(identifier) {
    const count = (attempts.get(identifier) || 0) + 1;
    attempts.set(identifier, count);
    return {
      count,
      blocked: count >= maxAttempts,
    };
  }

  function issueCsrfToken() {
    const token = `csrf_${crypto.randomBytes(8).toString("hex")}`;
    csrfTokens.add(token);
    return token;
  }

  function assertCsrfToken(token) {
    if (!csrfTokens.has(token)) {
      throw new Error("Invalid CSRF token.");
    }
    csrfTokens.delete(token);
    return true;
  }

  return {
    escapeHtml,
    recordLoginFailure,
    issueCsrfToken,
    assertCsrfToken,
  };
}

export function createPermissionSystem() {
  const grants = new Map();

  function grant(userId, permission, scope = "*") {
    const key = `${userId}:${permission}`;
    if (!grants.has(key)) {
      grants.set(key, new Set());
    }
    grants.get(key).add(scope);
  }

  function can(userId, permission, resource = {}) {
    const scopes = grants.get(`${userId}:${permission}`);
    if (!scopes) return false;
    if (scopes.has("*")) return true;
    if (resource.ownerId && scopes.has(`owner:${resource.ownerId}`)) return true;
    if (resource.organizationId && scopes.has(`organization:${resource.organizationId}`)) return true;
    return false;
  }

  function assertAllowed(userId, permission, resource = {}) {
    if (!can(userId, permission, resource)) {
      throw new Error("Permission denied.");
    }
    return true;
  }

  return { grant, can, assertAllowed };
}

export function createOperationsChecklist(config) {
  const required = ["NODE_ENV", "DATABASE_URL", "SESSION_SECRET", "BACKUP_BUCKET", "ALERT_EMAIL"];
  const missing = required.filter((key) => !config[key]);

  return {
    ready: missing.length === 0,
    missing,
    checks: [
      { name: "environment", pass: missing.length === 0 },
      { name: "database backup", pass: Boolean(config.BACKUP_BUCKET) },
      { name: "alerting", pass: Boolean(config.ALERT_EMAIL) },
      { name: "https", pass: config.PUBLIC_URL?.startsWith("https://") || false },
    ],
  };
}

export function createTestingMatrix(modules) {
  return modules.map((moduleName) => ({
    module: moduleName,
    unit: `${moduleName}: unit tests`,
    api: `${moduleName}: API tests`,
    permission: `${moduleName}: permission tests`,
    regression: `${moduleName}: regression tests`,
  }));
}

export function createBusinessEngine() {
  const coupons = new Map();
  const orders = new Map();

  function createCoupon({ code, discountCents }) {
    coupons.set(code, { code, discountCents });
    return coupons.get(code);
  }

  function createOrder({ userId, items, couponCode }) {
    if (!items.length) {
      throw new Error("Order requires at least one item.");
    }

    const subtotalCents = items.reduce((total, item) => total + item.unitPriceCents * item.quantity, 0);
    const coupon = couponCode ? coupons.get(couponCode) : null;
    const discountCents = coupon ? coupon.discountCents : 0;
    const totalCents = Math.max(0, subtotalCents - discountCents);
    const order = {
      id: `ord_${orders.size + 1}`,
      userId,
      items,
      subtotalCents,
      discountCents,
      totalCents,
      status: "pending_payment",
    };

    orders.set(order.id, order);
    return order;
  }

  function markPaid(orderId) {
    const order = orders.get(orderId);
    if (!order) {
      throw new Error("Order not found.");
    }
    order.status = "paid";
    return order;
  }

  return { createCoupon, createOrder, markPaid };
}

export function generateDocumentation({ title, endpoints, tables }) {
  const endpointRows = endpoints.map((endpoint) => `| ${endpoint.method} | ${endpoint.path} | ${endpoint.description} |`).join("\n");
  const tableRows = tables.map((table) => `| ${table.name} | ${table.purpose} |`).join("\n");

  return `# ${title}

## API

| Method | Path | Description |
| --- | --- | --- |
${endpointRows}

## Database

| Table | Purpose |
| --- | --- |
${tableRows}
`;
}

function assertEmail(email) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email.");
  }
}

function assertPassword(password) {
  if (typeof password !== "string" || password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }
}

function hashSecret(secret) {
  return crypto.createHash("sha256").update(secret).digest("hex");
}

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    verified: user.verified,
  };
}

function response(status, body) {
  return { status, body };
}

