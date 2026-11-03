const express = require("express");
const app = express();
port = 8080;

// Security: Enforce explicit payload size limits on incoming JSON and URL-encoded
// bodies to prevent Denial of Service (DoS) attacks from unbounded request payloads.
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

const router = require("./router");
app.use("/", router);

module.exports = app;
