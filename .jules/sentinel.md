## 2026-08-18 - Catalyst SDK Initialization and Express Error Boundary Security
**Vulnerability:** Uninitialized `catalyst` context in Express request handlers and unhandled async rejections caused runtime crashes (`ReferenceError`), unhandled promise rejections, and hanging client HTTP requests (DoS).
**Learning:** In Zoho Catalyst serverless Express functions, `catalyst.initialize(req)` must be invoked per request context within every controller handler, and all async SDK calls must be protected by try-catch blocks to ensure fail-secure error responses.
**Prevention:** Always initialize Catalyst per-request context inside each controller function and wrap asynchronous operations in try-catch blocks returning safe error responses without leaking stack traces.
