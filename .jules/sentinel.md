## 2026-10-01 - Catalyst SDK Per-Request Initialization and Unhandled Promise Rejections
**Vulnerability:** Controller functions in Zoho Catalyst Express endpoints failed to initialize `catalyst.initialize(req)` and lacked `try-catch` blocks, causing unhandled `ReferenceError` crashes and unhandled promise rejections that could result in Denial of Service or internal error disclosure.
**Learning:** In Zoho Catalyst serverless Express functions, SDK instances must be instantiated per-request inside each handler using `catalyst.initialize(req)`.
**Prevention:** Always wrap all async controller handlers in `try-catch` blocks and initialize `catalyst.initialize(req)` locally within the handler scope, returning standardized JSON error messages on failure.
