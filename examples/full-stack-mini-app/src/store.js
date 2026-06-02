import fs from "node:fs";
import path from "node:path";
import { hashPassword, randomId, verifyPassword } from "./security.js";

const DEFAULT_DATA = {
  users: [],
  sessions: [],
  orders: [],
  feedback: [],
  auditLogs: [],
};

const PLANS = {
  basic: { id: "basic", name: "Basic", amount: 0 },
  pro: { id: "pro", name: "Pro", amount: 9900 },
};

export function createStore(filePath) {
  const resolvedPath = path.resolve(filePath);

  function load() {
    if (!fs.existsSync(resolvedPath)) {
      return structuredClone(DEFAULT_DATA);
    }

    return { ...structuredClone(DEFAULT_DATA), ...JSON.parse(fs.readFileSync(resolvedPath, "utf8")) };
  }

  function save(data) {
    fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
    fs.writeFileSync(resolvedPath, JSON.stringify(data, null, 2));
  }

  function mutate(fn) {
    const data = load();
    const result = fn(data);
    save(data);
    return result;
  }

  return {
    plans: PLANS,

    all() {
      return load();
    },

    createUser({ email, name, password }) {
      return mutate((data) => {
        const normalizedEmail = email.toLowerCase();

        if (data.users.some((user) => user.email === normalizedEmail)) {
          throw new Error("EMAIL_ALREADY_REGISTERED");
        }

        const user = {
          id: randomId("user"),
          email: normalizedEmail,
          name: name || normalizedEmail.split("@")[0],
          passwordHash: hashPassword(password),
          role: data.users.length === 0 ? "admin" : "user",
          plan: "free",
          createdAt: new Date().toISOString(),
        };

        data.users.push(user);
        data.auditLogs.push({
          id: randomId("audit"),
          actorId: user.id,
          action: "user.registered",
          targetId: user.id,
          createdAt: new Date().toISOString(),
        });

        return user;
      });
    },

    verifyUser(email, password) {
      const data = load();
      const user = data.users.find((candidate) => candidate.email === email.toLowerCase());

      if (!user || !verifyPassword(password, user.passwordHash)) {
        return null;
      }

      return user;
    },

    findUserById(userId) {
      return load().users.find((user) => user.id === userId) ?? null;
    },

    createSession(userId) {
      return mutate((data) => {
        const session = {
          id: randomId("session"),
          userId,
          csrfToken: randomId("csrf"),
          createdAt: new Date().toISOString(),
        };

        data.sessions.push(session);
        data.auditLogs.push({
          id: randomId("audit"),
          actorId: userId,
          action: "session.created",
          targetId: session.id,
          createdAt: new Date().toISOString(),
        });

        return session;
      });
    },

    findSession(sessionId) {
      return load().sessions.find((session) => session.id === sessionId) ?? null;
    },

    deleteSession(sessionId) {
      mutate((data) => {
        data.sessions = data.sessions.filter((session) => session.id !== sessionId);
      });
    },

    createOrder({ userId, planId }) {
      return mutate((data) => {
        const plan = PLANS[planId];

        if (!plan) {
          throw new Error("UNKNOWN_PLAN");
        }

        const order = {
          id: randomId("order"),
          userId,
          planId,
          amount: plan.amount,
          status: plan.amount === 0 ? "active" : "paid",
          createdAt: new Date().toISOString(),
        };

        data.orders.push(order);

        const user = data.users.find((candidate) => candidate.id === userId);
        if (user) {
          user.plan = planId;
        }

        data.auditLogs.push({
          id: randomId("audit"),
          actorId: userId,
          action: "order.created",
          targetId: order.id,
          createdAt: new Date().toISOString(),
        });

        return order;
      });
    },

    listOrdersForUser(userId) {
      return load().orders.filter((order) => order.userId === userId);
    },

    listUsers() {
      return load().users;
    },

    createFeedback({ userId, message }) {
      return mutate((data) => {
        const item = {
          id: randomId("feedback"),
          userId,
          message,
          status: "open",
          createdAt: new Date().toISOString(),
        };

        data.feedback.push(item);
        data.auditLogs.push({
          id: randomId("audit"),
          actorId: userId,
          action: "feedback.created",
          targetId: item.id,
          createdAt: new Date().toISOString(),
        });

        return item;
      });
    },
  };
}

