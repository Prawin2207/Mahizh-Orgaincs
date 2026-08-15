const express = require("express");
const app = express();
const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 8080;

app.use(express.json());

const router = require("./router");
app.use("/", router);

module.exports = app;
