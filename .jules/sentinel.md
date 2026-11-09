# Sentinel's Security Journal

## 2026-11-09 - Payload Size Limiting on Catalyst Serverless Express Functions
**Vulnerability:** The Express serverless function lacked request body parsing configuration with payload size limits, leaving endpoints that accept request bodies vulnerable to memory exhaustion and Denial of Service (DoS) attacks via oversized payloads.
**Learning:** In Zoho Catalyst serverless Node.js Express functions, default Express instances without body-parser or size limits allow arbitrary body sizes or fail to parse request bodies, exposing the serverless runtime to memory starvation.
**Prevention:** Always mount `express.json({ limit: '10kb' })` and `express.urlencoded({ extended: true, limit: '10kb' })` on serverless Express application entrypoints before mounting routers.
