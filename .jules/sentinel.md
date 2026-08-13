## 2026-08-13 - Secure Catalyst Express Backend Context
**Vulnerability:** Global/uninitialized Catalyst SDK application context reference and unsanitized parameters in Zoho Catalyst Node.js Express serverless function.
**Learning:** In Zoho Catalyst, utilizing a global `app` variable across request handlers can cause reference errors and race conditions/scope pollution, particularly with asynchronous operations. Each handler must initialize context locally with `catalyst.initialize(req)`.
**Prevention:** Always initialize the application context locally inside each Express route handler, wrap operations in robust try-catch blocks to prevent unhandled promise rejections, and sanitize parameters to avoid direct parameter pollution.
