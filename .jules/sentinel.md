## 2026-09-07 - Catalyst SDK Initialization and Unhandled Rejections
**Vulnerability:** Calling Catalyst SDK methods (`app.datastore()`, `app.filestore()`) without initializing the SDK application context (`catalyst.initialize(req)`) in Express controller handlers triggers global `ReferenceError: app is not defined`, resulting in unhandled promise rejections, crash scenarios, and stack trace leaks.
**Learning:** Zoho Catalyst Express functions require initializing the per-request SDK instance using `catalyst.initialize(req)` inside each route handler rather than at global module scope.
**Prevention:** Always initialize `const app = catalyst.initialize(req);` inside each controller handler and wrap async operations in `try-catch` blocks returning generic secure error responses.
