# Sentinel Security Journal

## 2025-02-16 - Prevent Stack Trace Leakage and Unhandled Promise Rejections in Zoho Catalyst Serverless Express Functions
**Vulnerability:** Unhandled async errors and uninitialized `app` SDK references in controller actions resulted in Express exposing raw runtime error stack traces and internal application details to API consumers.
**Learning:** In Zoho Catalyst serverless Express functions, SDK instances must be initialized per request via `catalyst.initialize(req)`, and async route handlers must be wrapped in `try...catch` blocks or use global error handling middleware to sanitize responses.
**Prevention:** Always initialize `catalyst.initialize(req)` within each handler, use express.json() middleware, and catch all controller exceptions to return generic 500 error responses instead of leaking stack traces.
