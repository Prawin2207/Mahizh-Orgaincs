# Sentinel Security Journal

## 2025-05-18 - Catalyst Application Context Initialization & Endpoint Hardening
**Vulnerability:** Controller handlers used global/uninitialized application references, lacked body parsing middleware, omitted payload validation on datastore updates, and lacked error handling, creating risks of server denial-of-service and unhandled promise rejections.
**Learning:** In Zoho Catalyst Express functions, `catalyst.initialize(req)` must be called within each request scope rather than relying on global state, and body-parser middleware (`express.json()`) is required for payload processing.
**Prevention:** Always initialize Catalyst per request, validate input payloads (e.g., check for mandatory `ROWID`), wrap async Catalyst operations in try-catch blocks, and return safe generic HTTP error responses.
