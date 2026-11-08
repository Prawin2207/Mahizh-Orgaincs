const express = require("express");
const app = express();
const port = 8080;

// Security: Limit JSON request payload to 10kb to prevent Denial of Service (DoS) via memory exhaustion
app.use(express.json({ limit: "10kb" }));

const router = require("./router");
app.use("/", router);

module.exports = app;
