const express = require("express");
const app = express();
port = 8080;

// Security: Parse incoming JSON payloads to ensure req.body is properly populated
app.use(express.json());

const router = require("./router");
app.use("/",router);

module.exports = app;
