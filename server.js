const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const connectionDB = require("./config/db");

app.use(morgan("dev"));
app.use(express.json());
connectionDB();

// heroku
if (process.env.NODE_ENV == "production") {
  const path = require("path");

  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("API working");
});

app.use("/api", require("./routes/todo"));

const server = app.listen(PORT, () =>
  console.log(`Server is running successfully on port ${PORT}`)
);
