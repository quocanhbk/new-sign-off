const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const pdf = require('pdf-poppler')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 100000000}
}).single("myImage")

app.post("/upload", upload, (req, res) => {
    let dirPath = path.join(__dirname, 'public', 'image', path.basename(req.file.filename, path.extname(req.file.filename)))
    fs.mkdirSync(dirPath, () => console.log("oke"))
    let opts = {
        format: 'jpeg',
        out_dir: dirPath,
        out_prefix: 'image'
    }
    
    pdf.convert('./public/uploads/' + path.basename(req.file.originalname), opts)
        .then(() => {
            console.log("Convert successfully")
            let pathArray = fs.readdirSync(dirPath).map(filePath => path.join('image', path.basename(req.file.filename, path.extname(req.file.filename)), filePath))
            res.json({path: pathArray})
        }).catch(er => res.send({"Error: ": er}))
})


app.listen(5000, () => console.log("Server is running"))