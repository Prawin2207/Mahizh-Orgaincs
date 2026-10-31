const express = require("express");
const app = express();

// Security: Prevent information disclosure by removing X-Powered-By header
app.disable("x-powered-by");

// Security: Enforce request body size limits to prevent Denial of Service (DoS) attacks
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

const router = require("./router");
app.use("/", router);

// Security: Global error handler to prevent leaking stack traces or internal details
app.use((err, req, res, next) => {
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Payload too large" });
  }
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  return res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
