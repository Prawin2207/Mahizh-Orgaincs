const express = require("express");
const app = express();
const port = 8080;

// Security: Enforce request body parsing limits to mitigate Denial of Service (DoS) attacks
// from malicious actors transmitting arbitrarily large request payloads.
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

const router = require("./router");
app.use("/", router);

module.exports = app;
