const express = require("express");
const app = express();
port = 8080;

// Security: Parse incoming JSON request bodies and enforce a strict payload size limit (10kb)
// to prevent Denial of Service (DoS) attacks via oversized request bodies.
app.use(express.json({ limit: "10kb" }));

const router = require("./router");
app.use("/", router);

module.exports = app;
