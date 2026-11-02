const express = require("express");
const app = express();
port = 8080;

// Security: Restrict JSON payload size to prevent Denial of Service (DoS) memory exhaustion
app.use(express.json({ limit: "10kb" }));

const router = require("./router");
app.use("/",router);

module.exports = app;
