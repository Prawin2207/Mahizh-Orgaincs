const express = require("express");
const app = express();
const port = 8080;

// Security: Enforce explicit body parsing with payload size limits to mitigate Denial of Service (DoS) attacks
app.use(express.json({ limit: "10kb" }));

const router = require("./router");
app.use("/", router);

module.exports = app;
