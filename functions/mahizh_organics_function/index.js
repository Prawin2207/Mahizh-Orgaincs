const express = require("express");
const app = express();
port = 8080;

// Security: Parse incoming request bodies with explicit size limits
// to mitigate Denial of Service (DoS) attacks from unbounded payload sizes
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

const router = require("./router");
app.use("/", router);

module.exports = app;
