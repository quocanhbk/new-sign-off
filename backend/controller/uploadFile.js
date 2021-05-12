const express = require("express");
const router = express.Router();

// upload file
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-poppler");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "resource", "uploads"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
}).single("myImage");

router.post("/", upload, (req, res) => {
  let dirPath = path.join(
    __dirname,
    "..",
    "resource",
    "image",
    path.basename(req.file.filename, path.extname(req.file.filename))
  );

  //check whether the image folder exists or not
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, () => console.log("oke"));

    let opts = {
      format: "jpeg",
      out_dir: dirPath,
      out_prefix: "image",
    };

    pdf
      .convert(
        path.join(
          __dirname,
          "..",
          "resource",
          "uploads",
          path.basename(req.file.originalname)
        ),
        opts
      )
      .then(() => {
        let pathArray = fs
          .readdirSync(dirPath)
          .map((filePath) =>
            path.join(
              "image",
              path.basename(req.file.filename, path.extname(req.file.filename)),
              filePath
            )
          );
        res.json({ path: pathArray });
      })
      .catch((er) => res.send({ "Error: ": er }));
  }
  // in case the image folder already existed, we just need to send the path array to client
  else {
    let pathArray = fs
      .readdirSync(dirPath)
      .map((filePath) =>
        path.join(
          "image",
          path.basename(req.file.filename, path.extname(req.file.filename)),
          filePath
        )
      );
    res.json({ path: pathArray });
  }
});

module.exports = router;
