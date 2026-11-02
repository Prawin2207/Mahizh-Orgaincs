## 2026-11-02 - Catalyst Express Endpoint Input Validation and Request Body Limits
**Vulnerability:** The `updateProduct` endpoint passed unvalidated `req.body` directly to datastore operations without payload size limits or ROWID verification, and referenced `app` outside handler scope without error handling.
**Learning:** In Zoho Catalyst Express functions, omitting `express.json({ limit })` exposes endpoints to DoS via oversized payloads, while unvalidated payloads risk malformed datastore writes and unhandled promise rejections.
**Prevention:** Always enforce JSON parser size limits at the application entrypoint, validate row IDs and payload schemas before initiating datastore calls, and wrap Catalyst operations in try-catch blocks with defensive error responses.
