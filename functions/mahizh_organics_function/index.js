const express = require("express");
const app = express();
port = 8080;

const router = require("./router");
app.use(express.json()); // Securely parse JSON payload to prevent prototype pollution or unparsed body issues
app.use("/",router);

module.exports = app;
