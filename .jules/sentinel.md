## 2026-03-31 - Catalyst SDK Local Context Initialization & Express Unhandled Rejection Prevention
**Vulnerability:** Uninitialized global Catalyst SDK context references and missing error handling in Express route controllers led to unhandled promise rejections and potential runtime failure.
**Learning:** In Zoho Catalyst serverless Express functions, `catalyst.initialize(req)` must be called within each route handler context rather than relying on uninitialized global objects.
**Prevention:** Always initialize `catalyst.initialize(req)` inside individual request controllers and wrap datastore/filestore promises in try-catch blocks to prevent unhandled promise rejections.
