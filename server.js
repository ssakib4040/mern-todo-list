const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API working");
});

const server = app.listen(PORT, () =>
  console.log(`Server is running successfully on port ${PORT}`)
);
