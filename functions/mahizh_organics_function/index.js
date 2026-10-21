const express = require("express");
const app = express();
port = 8080;

// Security enhancement: Parse incoming JSON requests with a strict body limit to prevent Denial of Service (DoS) via large payloads
app.use(express.json({ limit: "10kb" }));

const router = require("./router");
app.use("/",router);

module.exports = app;
