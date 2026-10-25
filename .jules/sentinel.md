## 2025-10-25 - Zoho Catalyst Express Backend Request Context & Error Handling
**Vulnerability:** Uninitialized Catalyst SDK instance causing ReferenceErrors and missing try/catch error handling leading to unhandled promise rejections and potential runtime crashes / stack trace leakage.
**Learning:** In Zoho Catalyst Express functions, `catalyst.initialize(req)` must be called within each handler function to scope the Catalyst SDK context to the incoming request.
**Prevention:** Always initialize Catalyst per request (`const app = catalyst.initialize(req)`) and wrap controller actions in try/catch blocks with sanitized HTTP 500 JSON error responses.
