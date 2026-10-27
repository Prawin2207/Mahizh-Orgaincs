## 2026-10-27 - Catalyst Serverless Express Initialization & Error Boundary Security
**Vulnerability:** Unhandled errors, uninitialized Catalyst app instances in global scope causing server crashes, and unsanitized parameters in filestore/datastore API routes.
**Learning:** In Zoho Catalyst Express functions, `catalyst.initialize(req)` must be called within each handler request context rather than global scope. Lacking per-handler initialization and try-catch error boundaries causes unhandled promise rejections and stack trace leaks.
**Prevention:** Always initialize Catalyst context per request in controller handlers, wrap handlers with try-catch blocks to catch errors, validate route parameters (`folderid`, `fileid`), and include `express.json()` middleware.
