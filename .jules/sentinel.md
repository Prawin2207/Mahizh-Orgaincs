## 2026-08-06 - [ZCQL Injection & Global Variable Misconfiguration]
**Vulnerability:** ZCQL (Zoho Catalyst Query Language) SQL injection via unvalidated query parameters, plus ReferenceError/Uncaught Exception risks in Express backend controllers caused by uninitialized SDK application variables.
**Learning:** In Zoho Catalyst serverless Node.js functions, using `catalyst.initialize(req)` is required within each specific routing middleware or handler function to instantiate a request-scoped application context. Referencing `app` globally or without initialising it within the handler scope results in unhandled ReferenceErrors when that endpoint is invoked, leading to a denial of service (DoS) for those endpoints. Additionally, embedding non-validated variables (like offset/limit) directly into ZCQL queries enables query structure manipulation.
**Prevention:**
1. Scope-initialize `app = catalyst.initialize(req)` inside every endpoint handler function.
2. Strictly validate and sanitize dynamic variables (e.g. converting limits and offsets to integers using `parseInt(..., 10)`) before interpolating them into ZCQL query strings.
3. Wrap asynchronous operations in `try/catch` blocks to prevent unhandled promise rejections and secure the error response format so implementation details do not leak to client-side requests.
