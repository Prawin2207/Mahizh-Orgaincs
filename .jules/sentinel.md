# Sentinel's Security Journal

## 2026-11-03 - Express Request Body Size Limits in Zoho Catalyst Functions
**Vulnerability:** Zoho Catalyst Express functions handling PUT/POST payloads (`updateProduct`) lacked body parsing middleware with explicit size limits, leaving the endpoint susceptible to unbounded payload buffering and Denial of Service (DoS) attacks.
**Learning:** Catalyst functions mount an Express application instance that requires explicit body parsers (`express.json({ limit: '10kb' })` and `express.urlencoded({ extended: true, limit: '10kb' })`) to populate `req.body` securely without exposing the server process to memory exhaustion.
**Prevention:** Always configure explicit size constraints on `express.json` and `express.urlencoded` middlewares at the Express root app level before registering routes.
