## 2025-05-10 - Undefined Catalyst Application Context & Unhandled Rejections in Route Handlers
**Vulnerability:** Controller handlers `updateProduct` and `getImage` referenced an uninitialized global `app` object and lacked `try-catch` blocks, causing unhandled promise rejections, parameter typos (`req.parms`), and unhandled server crashes/information leakage.
**Learning:** In Zoho Catalyst Express functions, `catalyst.initialize(req)` must be called inside every individual request handler to instantiate the app context safely.
**Prevention:** Always initialize `catalyst.initialize(req)` inside controller actions and wrap asynchronous operations in `try-catch` blocks that return generic error responses.
