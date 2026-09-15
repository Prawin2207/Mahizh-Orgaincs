const express = require("express");
const app = express();

app.use(express.json());

const router = require("./router");
app.use("/", router);

// Global error handler to prevent exposing stack traces or internal implementation details
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
