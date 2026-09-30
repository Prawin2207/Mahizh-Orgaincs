## 2026-03-31 - Unhandled Catalyst SDK Errors and Uninitialized Request Context
**Vulnerability:** Controller actions in Zoho Catalyst functions referenced uninitialized `app` instance and lacked error handling middleware/blocks, leading to runtime reference errors, unhandled promise rejections, and potential exposure of sensitive internal stack traces.
**Learning:** Catalyst SDK application context must be initialized inside each individual request handler via `catalyst.initialize(req)`, and async operations must be wrapped in `try...catch` blocks with standardized error responses to prevent information disclosure.
**Prevention:** Always initialize Catalyst context per-request (`catalyst.initialize(req)`) and catch promise rejections with sanitized error messages.
