const express = require("express");
const app = express();
port = 8080;

// Security enhancement: Limit JSON request payload size to 10kb to prevent DoS attacks via memory exhaustion
app.use(express.json({ limit: "10kb" }));

const router = require("./router");
app.use("/",router);

module.exports = app;
