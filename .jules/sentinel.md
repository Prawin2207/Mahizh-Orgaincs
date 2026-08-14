## 2025-05-20 - Unhandled Promise Rejections and Missing SDK Context in Zoho Catalyst Functions
**Vulnerability:** Unhandled promise rejections and `ReferenceError: app is not defined` in Zoho Catalyst Express route handlers when `catalyst.initialize(req)` is missing or promise errors are not caught.
**Learning:** Zoho Catalyst SDK functions require request-scoped initialization (`catalyst.initialize(req)`) inside each Express route handler, and async operations (like filestore operations) must be wrapped in `try-catch` blocks to prevent unhandled promise rejections or server crashes.
**Prevention:** Always initialize `catalyst.initialize(req)` within the controller function scope and use `async/await` with standard `try-catch` blocks for all Catalyst SDK calls.
