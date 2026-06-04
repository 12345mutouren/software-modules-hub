export function createTemplateContract() {
  const routes = [
    { method: "GET", path: "/", owner: "web" },
    { method: "POST", path: "/api/auth/login", owner: "api" },
    { method: "GET", path: "/api/me", owner: "api" },
    { method: "GET", path: "/dashboard", owner: "web" },
  ];

  const services = ["web", "api", "worker", "postgres", "redis", "object-storage"];

  function routeExists(method, path) {
    return routes.some((route) => route.method === method && route.path === path);
  }

  function deploymentPlan() {
    return services.map((service) => ({
      service,
      healthCheck: service === "postgres" ? "connection" : "http-or-process",
    }));
  }

  return {
    routes,
    services,
    routeExists,
    deploymentPlan,
  };
}

