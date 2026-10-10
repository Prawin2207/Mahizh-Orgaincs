const express = require("express");
const app = express();
port = 8080;

app.use(express.json());

const router = require("./router");
app.use("/", router);

module.exports = app;
