let csrfToken = null;

const statusEl = document.querySelector("#status");
const outputEl = document.querySelector("#output");

function print(payload) {
  outputEl.textContent = JSON.stringify(payload, null, 2);
}

async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(csrfToken ? { "x-csrf-token": csrfToken } : {}),
      ...(options.headers ?? {}),
    },
  });
  const payload = await response.json();

  if (!response.ok) {
    throw payload;
  }

  return payload;
}

async function refreshMe() {
  const payload = await request("/api/me");
  csrfToken = payload.csrfToken;
  statusEl.textContent = payload.user
    ? `${payload.user.name} · ${payload.user.role} · ${payload.user.plan}`
    : "未登录";
  print(payload);
}

function formJson(form) {
  return Object.fromEntries(new FormData(form).entries());
}

document.querySelector("#registerForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const payload = await request("/api/register", {
      method: "POST",
      body: JSON.stringify(formJson(event.currentTarget)),
    });
    csrfToken = payload.csrfToken;
    await refreshMe();
  } catch (error) {
    print(error);
  }
});

document.querySelector("#loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const payload = await request("/api/login", {
      method: "POST",
      body: JSON.stringify(formJson(event.currentTarget)),
    });
    csrfToken = payload.csrfToken;
    await refreshMe();
  } catch (error) {
    print(error);
  }
});

document.querySelector("#orderForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    print(
      await request("/api/orders", {
        method: "POST",
        body: JSON.stringify(formJson(event.currentTarget)),
      }),
    );
    await refreshMe();
  } catch (error) {
    print(error);
  }
});

document.querySelector("#feedbackForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    print(
      await request("/api/feedback", {
        method: "POST",
        body: JSON.stringify(formJson(event.currentTarget)),
      }),
    );
  } catch (error) {
    print(error);
  }
});

document.querySelector("#loadOrders").addEventListener("click", async () => {
  try {
    print(await request("/api/orders"));
  } catch (error) {
    print(error);
  }
});

document.querySelector("#loadUsers").addEventListener("click", async () => {
  try {
    print(await request("/api/admin/users"));
  } catch (error) {
    print(error);
  }
});

document.querySelector("#logout").addEventListener("click", async () => {
  try {
    print(await request("/api/logout", { method: "POST", body: "{}" }));
    csrfToken = null;
    await refreshMe();
  } catch (error) {
    print(error);
  }
});

refreshMe().catch(print);

