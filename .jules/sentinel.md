# Sentinel Security Journal

## 2026-10-31 - Request Body Size Limits & Fingerprinting in Serverless Express Functions
**Vulnerability:** The Zoho Catalyst Express serverless backend mounted routes accepting JSON payloads without registering body parser middleware or configuring body size limits, leaving the function susceptible to unhandled body parsing, uncaught syntax errors exposing internal errors, and Denial of Service (DoS) via memory exhaustion from unbounded request bodies. In addition, the default `x-powered-by` header exposed framework fingerprinting.
**Learning:** In Zoho Catalyst serverless Node.js Express functions, request handling expects standard Express middleware configured at the app entry point. Without explicit payload limits on `express.json()` and `express.urlencoded()`, unbounded payloads can exhaust serverless function memory limits or trigger unhandled payload syntax crashes.
**Prevention:** Always explicitly configure `express.json({ limit: '10kb' })`, disable `x-powered-by`, and attach standard error handlers for parsing errors (`entity.too.large`, invalid JSON syntax) to fail securely without exposing internal stack traces.
