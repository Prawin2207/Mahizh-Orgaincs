## 2026-10-24 - Unhandled Async Errors and Unsanitized Data Store Mutations in Catalyst Express Handlers
**Vulnerability:** Uncaught exceptions and unhandled promise rejections in Express request handlers exposed stack traces and server internals, while direct `req.body` passing in `updateRow` exposed data store rows to property injection.
**Learning:** In Zoho Catalyst serverless Express functions, per-handler SDK initialization (`catalyst.initialize(req)`), strict input field whitelisting, and try-catch error boundaries are required to fail securely and prevent process crashes.
**Prevention:** Always wrap Catalyst SDK operations in try-catch blocks with generic HTTP 500 error responses and whitelist allowed input fields before executing datastore queries.
