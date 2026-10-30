const express = require("express");
const app = express();
port = 8080;

// Restrict JSON payload size to 10kb to mitigate Denial of Service (DoS) risks
app.use(express.json({ limit: "10kb" }));

const router = require("./router");
app.use("/",router);

module.exports = app;
