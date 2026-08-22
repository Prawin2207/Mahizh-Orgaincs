## 2026-08-22 - Express Backend Missing Body Parsers & Catalyst SDK Initialization Errors
**Vulnerability:** Uninitialized Catalyst SDK context (`app`), uncaught promise rejections leaking stack traces/errors, and missing Express JSON body parsing causing request processing failures in serverless backend function.
**Learning:** In Zoho Catalyst Express functions, `catalyst.initialize(req)` must be called per request scope, middleware `express.json()` must be mounted explicitly in `index.js`, and all async handlers must be wrapped in `try/catch` to fail securely with sanitized 500 responses.
**Prevention:** Always initialize Catalyst per-request, validate/parse request bodies safely, and sanitize error responses across all endpoint handlers.
