# Sentinel Security Journal

## 2026-08-08 - Secure Zoho Catalyst SDK Context Initialization
**Vulnerability:** In Zoho Catalyst serverless Express functions, request handlers were accessing a shared, globally scoped or undefined `app` reference instead of initializing the Zoho Catalyst SDK app context locally within each handler. This led to `ReferenceError` crashes (DoS) and a risk of request/tenant context bleeding (data/privacy leakage across concurrent or subsequent requests).
**Learning:** Zoho Catalyst SDK `catalyst.initialize(req)` must be called independently inside *every* Express request handler to correctly bind the execution environment to that specific request's scope.
**Prevention:** Always initialize the Catalyst application instance locally within each request handler (`const app = catalyst.initialize(req);`). Wrap all asynchronous operations in `try-catch` blocks to capture database or filestore promise rejections and respond securely without crashing the serverless container.
