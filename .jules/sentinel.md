# 🛡️ Sentinel's Journal

## 2026-08-04 - Unhandled Serverless Errors and Lack of Input Validation in Zoho Catalyst Function
**Vulnerability:** Zoho Catalyst Node.js functions lacked robust error handling, unparsed body payloads, and lacked strict validation for `ROWID`, `folderid`, and `fileid`. This caused unhandled promise rejections, request hanging, and potential information leakage or internal error details exposure to consumers.
**Learning:** In Catalyst Express functions, because the framework initializes the app context on each request dynamically (`catalyst.initialize(req)`), helper router/controller middleware can be bypassed or misconfigured. Unhandled errors inside async database operations (like ZCQL or Datastore updates) or filestore file streams can crash serverless runtimes or expose internal infrastructure details.
**Prevention:** Always wrap Catalyst route handlers in robust `try-catch` blocks, validate all external parameters (such as `ROWID` or `fileid` utilizing safe numeric ID validation `/^\d+$/`), and ensure safe non-leaky error responses (e.g., standard `"Internal server error"` or bad request messages) are returned to the client.
