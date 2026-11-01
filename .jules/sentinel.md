# Sentinel Security Journal

## 2026-11-01 - Express Payload Size Limits in Catalyst Functions
**Vulnerability:** Missing body parser middleware and unconstrained payload sizes on backend serverless functions handling JSON inputs. Without explicit limits, endpoints receiving JSON payloads are vulnerable to Denial of Service (DoS) attacks via memory exhaustion from oversized request bodies.
**Learning:** In Zoho Catalyst serverless Express functions, request body parsing is not enabled by default. Omitting explicit body parsing also leaves `req.body` undefined for POST/PUT endpoints like `updateProduct`.
**Prevention:** Always mount `express.json({ limit: '10kb' })` with an explicit payload size limit before registering route handlers on the Express application.
