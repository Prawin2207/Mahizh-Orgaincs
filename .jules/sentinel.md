# Sentinel Security Journal - Mahizh Organics

## 2026-10-11 - Request Context & Unhandled Promise Errors in Zoho Catalyst Express App
**Vulnerability:** Missing SDK initialization per request (`catalyst.initialize(req)`) and unhandled promise rejections in controller handlers allowed unhandled exceptions, ReferenceErrors, and possible internal information leakage or server failure.
**Learning:** In Zoho Catalyst serverless Express functions, each request handler must initialize the Catalyst app context (`catalyst.initialize(req)`) independently rather than sharing an uninitialized or selectively initialized global object.
**Prevention:** Always initialize Catalyst context per request in controller handlers, parse JSON request bodies via `express.json()`, and wrap asynchronous datastore/filestore calls in try-catch/promise catch blocks returning sanitized error responses.
