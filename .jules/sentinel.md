## 2025-05-10 - [Express Request Handling & Catalyst SDK Initialization Failure Safety]
**Vulnerability:** Express controller methods lacked try-catch blocks and request body parsing middleware. Catalyst SDK initialization and promise rejections led to process crashes and unhandled promise rejections.
**Learning:** Catalyst SDK context must be initialized inside each handler via `catalyst.initialize(req)`, and async operations must be wrapped in try-catch to return sanitized standard HTTP error responses.
**Prevention:** Always mount `express.json()` middleware on Express apps and wrap all async Catalyst SDK calls in standard error handling logic.
