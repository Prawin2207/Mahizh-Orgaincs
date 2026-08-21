## 2025-05-18 - Catalyst SDK Context Scope and Unhandled Promise Exception Leakage
**Vulnerability:** Uninitialized Catalyst SDK instance access across async routes led to global scope ReferenceErrors, while unhandled controller errors leaked execution details and allowed unhandled promise rejections.
**Learning:** In Zoho Catalyst serverless Express functions, `catalyst.initialize(req)` must be invoked inside every request handler to establish isolated SDK context.
**Prevention:** Always initialize Catalyst SDK context per request handler, wrap asynchronous operations in try-catch blocks with generic error responses, and mount `express.json()` middleware on the express app.
