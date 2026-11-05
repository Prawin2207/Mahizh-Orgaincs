## 2026-11-05 - Request Body Size Limits in Express Functions
**Vulnerability:** The Express serverless backend was mounted without request body parsing limits. Unconstrained body parsers allow attackers to send massive payloads, leading to memory exhaustion and Denial of Service (DoS) in serverless function containers.
**Learning:** In Zoho Catalyst serverless Express functions, body parsing is not enabled by default, but adding unbounded body parsing opens DoS vectors. Explicitly setting `limit: '10kb'` on `express.json` and `express.urlencoded` protects memory resources while accommodating typical API payloads.
**Prevention:** Always specify strict payload size limits (`express.json({ limit: '10kb' })`) when initializing Express middleware in backend functions.
