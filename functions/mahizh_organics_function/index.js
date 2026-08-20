const express = require("express");
const app = express();
port = 8080;

// Security Enhancement: Explicit JSON middleware with body payload size limit to prevent payload DoS attacks
app.use(express.json({ limit: "100kb" }));

const router = require("./router");
app.use("/",router);

module.exports = app;
