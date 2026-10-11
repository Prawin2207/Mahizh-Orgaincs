const express = require("express");
const app = express();

app.use(express.json());

const router = require("./router");
app.use("/", router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
