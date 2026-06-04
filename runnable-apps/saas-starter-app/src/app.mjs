export function createSaasApp() {
  const users = [];
  const organizations = [];
  const memberships = [];
  const subscriptions = [];
  const usageEvents = [];

  function createUser({ email, role = "user" }) {
    if (!email.includes("@")) throw new Error("Invalid email.");
    const user = { id: `usr_${users.length + 1}`, email: email.toLowerCase(), role };
    users.push(user);
    return user;
  }

  function createOrganization({ name, ownerId }) {
    const organization = { id: `org_${organizations.length + 1}`, name, ownerId, plan: "free" };
    organizations.push(organization);
    memberships.push({ organizationId: organization.id, userId: ownerId, role: "owner" });
    return organization;
  }

  function inviteMember({ organizationId, userId, role = "member" }) {
    requireMembership(organizationId, userId, false);
    const membership = { organizationId, userId, role };
    memberships.push(membership);
    return membership;
  }

  function subscribe({ organizationId, plan }) {
    const organization = requireOrganization(organizationId);
    organization.plan = plan;
    const subscription = { id: `sub_${subscriptions.length + 1}`, organizationId, plan, status: "active" };
    subscriptions.push(subscription);
    return subscription;
  }

  function recordUsage({ organizationId, metric, quantity }) {
    requireOrganization(organizationId);
    const event = { id: `use_${usageEvents.length + 1}`, organizationId, metric, quantity };
    usageEvents.push(event);
    return event;
  }

  function usageSummary(organizationId) {
    return usageEvents
      .filter((event) => event.organizationId === organizationId)
      .reduce((summary, event) => {
        summary[event.metric] = (summary[event.metric] || 0) + event.quantity;
        return summary;
      }, {});
  }

  function canManageBilling({ userId, organizationId }) {
    const membership = requireMembership(organizationId, userId);
    return ["owner", "billing_admin"].includes(membership.role);
  }

  function requireOrganization(organizationId) {
    const organization = organizations.find((item) => item.id === organizationId);
    if (!organization) throw new Error("Organization not found.");
    return organization;
  }

  function requireMembership(organizationId, userId, shouldExist = true) {
    const membership = memberships.find((item) => item.organizationId === organizationId && item.userId === userId);
    if (shouldExist && !membership) throw new Error("Membership not found.");
    return membership;
  }

  return {
    createUser,
    createOrganization,
    inviteMember,
    subscribe,
    recordUsage,
    usageSummary,
    canManageBilling,
  };
}

