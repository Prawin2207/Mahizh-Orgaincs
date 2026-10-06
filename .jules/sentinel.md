# Sentinel Security Journal

## 2025-05-18 - Uninitialized SDK Application Context and Missing Rejection Handlers in Zoho Catalyst Handlers
**Vulnerability:** Request handlers in Express controllers omitted per-request `catalyst.initialize(req)` context initialization, leading to global `ReferenceError`s and unhandled promise rejections on API endpoints.
**Learning:** In Zoho Catalyst serverless Node.js functions, `catalyst.initialize(req)` must be called inside every handler context to securely scope operations and manage filestore/datastore instances.
**Prevention:** Always initialize Catalyst per request context (`const app = catalyst.initialize(req)`) and wrap asynchronous filestore/datastore operations in try-catch/catch handlers that return sanitized generic error responses.
