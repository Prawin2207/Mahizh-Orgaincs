# Sentinel's Security Journal

## 2026-11-06 - Missing Body Parser & Unbounded Payload DoS in Catalyst Functions
**Vulnerability:** In Zoho Catalyst Express functions, request handlers that accept body data (such as `req.body` in `updateProduct`) fail if `express.json()` is missing, and without explicit size limits, apps are exposed to payload-based Denial of Service (DoS) attacks.
**Learning:** Catalyst functions are standard Express applications under the hood, requiring explicit body parsing middleware with strict size limits configured at the entrypoint (`index.js`).
**Prevention:** Always configure `express.json({ limit: '10kb' })` and `express.urlencoded({ extended: false, limit: '10kb' })` before attaching application routers.
