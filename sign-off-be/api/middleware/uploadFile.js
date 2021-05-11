const express = require("express");
const router = express.Router();

// upload file
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-poppler");

const storage = multer.diskStorage({
  destination: "../../public/uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
}).single("myImage");

router.post("/", upload, async (req, res) => {
  let dirPath = await path.join(
    __dirname,
    "public",
    "image",
    path.basename(req.file.filename, path.extname(req.file.filename))
  );
  await fs.mkdirSync(dirPath, () => console.log("oke"));
  let opts = {
    format: "jpeg",
    out_dir: dirPath,
    out_prefix: "image",
  };

  pdf
    .convert("../../public/uploads/" + path.basename(req.file.originalname), opts)
    .then(() => {
      console.log("Convert successfully");
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
});

router.get('/', (req, res) => {
    res.send("hihi")
})
module.exports = router;
