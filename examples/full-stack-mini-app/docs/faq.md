# FAQ

## Why does this example avoid external packages?

To make the module relationships easier to see. Frameworks are useful, but this phase focuses on the smallest runnable shape of a complete software system.

## Is JSON file storage production-ready?

No. It is used only so the data layer is visible without installing a database.

## Is the payment flow real?

No. The order flow simulates a paid plan. Production software should use a payment provider such as Stripe and verify webhook events server-side.

## Is the security production-ready?

No. It demonstrates password hashing, HttpOnly Cookie sessions, CSRF checks, rate limiting, and authorization. Production systems need deeper hardening, monitoring, dependency scanning, and compliance work.

## Why is the first user an admin?

It is a simple bootstrapping rule for a local example. Production systems should use an explicit admin creation or invitation process.

