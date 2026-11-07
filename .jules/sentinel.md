# Sentinel's Security Journal

## 2026-11-07 - Express JSON Body Parser DoS Mitigation in Serverless Backend
**Vulnerability:** The Zoho Catalyst Express serverless backend was consuming incoming request bodies in endpoints such as `/updateProduct` without explicit JSON body parsing or payload size limits, posing a Denial of Service (DoS) risk through memory exhaustion and CPU starvation from oversized request payloads.
**Learning:** In Zoho Catalyst Advanced I/O Express functions, body parsing is not enabled by default. Omitting explicit parser middleware with size constraints allows arbitrary-sized payloads to reach the function runtime or leaves `req.body` undefined.
**Prevention:** Always configure `express.json({ limit: '10kb' })` (or an application-appropriate limit) at the Express app entry point before registering route handlers.
