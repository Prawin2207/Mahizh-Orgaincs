## 2026-09-26 - Express Middleware and Unhandled Catalyst SDK Context Errors
**Vulnerability:** Uncaught async errors in serverless handlers and uninitialized SDK context causing unhandled promise rejections and potential error stack trace leakage.
**Learning:** In Zoho Catalyst serverless Express functions, failure to initialize `catalyst.initialize(req)` inside request handlers causes reference errors. Missing explicit `express.json()` middleware prevents body parsing on `PUT`/`POST` requests.
**Prevention:** Always initialize Catalyst context per request in controller handlers, configure `express.json()`, and enclose all async controller actions in `try/catch` blocks returning generic 500 error responses.
