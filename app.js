const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");

const app = express();
const port = 3000 || process.env.PATH;

// EJS setup
app.set("view engine", "ejs");

// Static folder setup
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
