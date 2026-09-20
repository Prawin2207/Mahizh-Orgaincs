# Sentinel's Security Journal

## 2026-09-20 - Express Serverless Unhandled Exceptions and Reference Errors
**Vulnerability:** Express controller functions lacked `try...catch` error handling and initialized Catalyst application instances outside request handlers or omitted them entirely, leading to unhandled promise rejections, `ReferenceError` crashes, and raw stack traces being exposed or hanging connections.
**Learning:** In Zoho Catalyst serverless Express functions, each request handler must initialize the Catalyst context via `catalyst.initialize(req)` and wrap asynchronous operations in `try...catch` blocks to send sanitized HTTP 500 responses (`{ error: 'Internal server error' }`) rather than allowing internal errors to crash the process or leak internal architecture details.
**Prevention:** Always initialize Catalyst per request and implement generic error handling around async operations in API route controllers.
