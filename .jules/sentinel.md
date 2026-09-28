## 2026-09-28 - Catalyst SDK Request Context & Unhandled Promise Rejections
**Vulnerability:** Controller actions using `catalyst.initialize(req)` omitted initialization or error wrapping, causing unhandled `ReferenceError` crashes or unhandled promise rejections on malformed requests/SDK errors.
**Learning:** In Zoho Catalyst serverless Express functions, each route handler must initialize `catalyst.initialize(req)` per request and wrap operations in `try/catch` blocks to prevent unhandled promise rejections and stack trace leaks.
**Prevention:** Always validate request payloads (`req.body`, `req.params`) and wrap Catalyst SDK operations in try/catch blocks returning safe 500 error responses.
