const express = require("express");
const router = express.Router();
const { fromPath } = require("pdf2pic");
const path = require("path");
const multer = require("multer");
const { mkdirsSync, writeFileSync } = require("fs-extra");
const rimraf = require("rimraf");

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

//   let dirPath = await path.join(
//     __dirname,
//     "../../public",
//     "image",
//     path.basename(req.file.filename, path.extname(req.file.filename))
//   );
router.post("/", (req, res) => {
    try {
        const options = {
            saveFilename: "untitled",
            savePath: "../../public/test",
            format: "png",
            width: 600,
            height: 600,
          };
          const storeAsImage = fromPath('../../new-sign-off/sign-off-be/public/image/pythoncoban.pdf', options);
          storeAsImage.pulk('')
        //   const pageToConvertAsImage = 1;
      
        //   storeAsImage(pageToConvertAsImage).then((resolve) => {
        //       console.log("Page 1 is now converted as image");
            
        //       return resolve;
        //     });
    } catch (error) {
        console.error(error)
    }

//   const specimen1 = "../sign-off-be/public/image/python co ban.pdf";

//   const outputDirectory = "../sign-off-be/public/test";
//   rimraf.sync(outputDirectory);

//   mkdirsSync(outputDirectory);

//   const baseOptions = {
//     width: 600,
//     height: 600,
//     density: 330,
//     savePath: "../../public/image",
//     format: "png",
//   };

//   const convert = fromPath(specimen1, baseOptions);

//   //   convert.bulk([2,4], true).then((outputs) => {
//   //       console.log(outputs)
//   //     outputs.forEach((output) => {
//   //         console.log("convert success")
//   //       writeFileSync(outputDirectory + `/base64-output.${output.page}.txt`, output.base64);
//   //       writeFileSync(outputDirectory + `/base64-output.${output.page}.png`, output.base64, "base64");
//   //     });
//   //   });

//   return convert(1);
});

module.exports = router;
