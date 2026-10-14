const express = require("express");
const app = express();

// Parse JSON request bodies securely
app.use(express.json());

const router = require("./router");
app.use("/", router);

module.exports = app;
