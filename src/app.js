// app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pestRoutes = require("./routes/pestRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "server is running",
  });
});

app.get("/", (req, res) => {
  res.send("Backend server is running! 배포 테스트용");
});


app.use("/api/pest", pestRoutes);

module.exports = app;