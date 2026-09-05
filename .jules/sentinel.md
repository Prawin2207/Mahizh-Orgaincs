# Sentinel Security Journal

## 2026-09-05 - Zoho Catalyst Request Scope Initialization & Unhandled Async Rejections
**Vulnerability:** Controller functions in `functions/mahizh_organics_function/controller.js` lacked request-scoped Catalyst initialization (`catalyst.initialize(req)`), leading to reference errors (`app is not defined`) and missing error handling in async promises, exposing internal error details and causing unhandled promise rejections.
**Learning:** In Zoho Catalyst serverless Express functions, each request handler must explicitly initialize Catalyst context with `catalyst.initialize(req)` and wrap async database/filestore calls in `try/catch` blocks to fail securely and sanitize HTTP error responses.
**Prevention:** Always initialize Catalyst context inside the request handler and handle async exceptions with sanitized 500 error responses without exposing internal error objects or stack traces.
