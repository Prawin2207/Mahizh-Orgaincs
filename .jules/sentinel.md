# Sentinel Security Journal

## 2026-08-11 - [Zoho Catalyst Express SDK Context and Unhandled Rejections]
**Vulnerability:** Uninitialized global `app` Catalyst references inside individual express route handlers, typoed parameters, and lack of try-catch wrapper blocks leading to unhandled promise rejections and hanging client HTTP requests.
**Learning:** In Zoho Catalyst Advanced I/O Express functions, the SDK application context is req-scoped and must be initialized using `catalyst.initialize(req)` inside every request handler. Reusing a globally or partially initialized `app` reference results in undefined behavior and server crashes. Unhandled rejections leave request connections open, causing resource/socket exhaustion (DoS).
**Prevention:** Always initialize the context locally within each route handler via `catalyst.initialize(req)`. Wrap asynchronous operations in `try...catch` blocks, return generic user-friendly error responses without exposing internal stack traces, and always send an HTTP response status to the client.
