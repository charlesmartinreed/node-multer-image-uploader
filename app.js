const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");

// with multer, we need to create a storage engine
const storage = multer.diskStorage({
  // needs to know where to upload the files and what to name the file
  // path.extname takes in a file and extract the file extension
  destination: "./public/uploads/",
  filename: function(req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init upload - .single because we're dealing with just a single file
// name is simply whatever we set for the name attribute in our file input
const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("myImage");

function checkFileType(file, cb) {
  // check extension and mimetype
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error(`Only images are allowed - png, jpg, jpeg`));
  }
}

const app = express();
const port = 3000 || process.env.PATH;

// EJS setup
app.set("view engine", "ejs");

// Static folder setup
app.use(express.static("./public"));

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", (req, res) => {
  // req.file has fieldname, originalname, destination, filename, etc.
  upload(req, res, err => {
    if (err) {
      res.render("index", { msg: err.message });
    } else {
      console.log(req.file);
      res.send("testttttt");
    }
  });
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
