const express = require("express");
const app = express();
port = 8080;

// Security Enhancement: Explicitly parse incoming JSON request bodies with a strict size limit.
// Enforcing a 10kb limit mitigates Denial of Service (DoS) attacks caused by memory exhaustion
// from maliciously oversized payloads while providing req.body to API handlers.
app.use(express.json({ limit: "10kb" }));

const router = require("./router");
app.use("/", router);

module.exports = app;
