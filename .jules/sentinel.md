# Sentinel Security Journal

## 2025-05-18 - Zoho Catalyst Express Context & Request Handling
**Vulnerability:** Global scope reference errors (`app is not defined`) and unhandled promise rejections in controller endpoints caused application crashes and exposed raw error traces.
**Learning:** Zoho Catalyst SDK requires explicit request initialization (`catalyst.initialize(req)`) per request scope in serverless Express handlers rather than relying on global instances.
**Prevention:** Always initialize `catalyst.initialize(req)` inside handler scope, wrap async operations in try-catch blocks, and register `express.json()` body-parser middleware on the Express app instance.
