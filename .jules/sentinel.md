## 2025-02-18 - Unhandled Exception Leaks and Uninitialized Catalyst Scope in Express Controller
**Vulnerability:** Express controller actions accessed uninitialized global `app` reference and `req.body` without `express.json()` middleware, causing unhandled promise rejections / runtime crashes and potential error details leakage.
**Learning:** Zoho Catalyst SDK functions require initialization via `catalyst.initialize(req)` per request in each controller action, and JSON parsing middleware must be explicitly added to Express.
**Prevention:** Always initialize `catalyst.initialize(req)` within each controller request handler and wrap asynchronous SDK calls in `try...catch` blocks to fail securely without leaking internal stack traces.
