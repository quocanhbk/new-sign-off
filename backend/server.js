const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000
const UploadController = require('./controller/uploadFile')
const PrintFileController = require('./controller/printFile')

// app use
app.use(express.static(path.join(__dirname, "resource")));
app.use(express.json());


// use middleware
// if it handles the route, we call it controller, middleware is the sub-controller before the controller
app.use("/upload", UploadController);
app.post("/download", PrintFileController)

app.listen(PORT, () => console.log("Server is running on port " + PORT))