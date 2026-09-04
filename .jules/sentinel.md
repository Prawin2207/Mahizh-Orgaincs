## 2026-09-04 - Catalyst Request Context Isolation and Unhandled Async Rejections
**Vulnerability:** Controller handlers used a shared global `app` variable from previous requests instead of initializing `catalyst.initialize(req)` per-request, and omitted try-catch blocks around async SDK calls.
**Learning:** Shared global SDK instances in serverless Express functions lead to request context leakage across users, and unhandled promise rejections can crash the function or hang pending HTTP connections.
**Prevention:** Always initialize `catalyst.initialize(req)` inside every request handler scope and wrap async Catalyst operations in try-catch blocks with sanitized error responses.
