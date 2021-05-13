const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const morgan = require("morgan");
const http = require('http')

// init database
// const select = require("./controller/selectController");

// app use
app.use(express.static(path.join(__dirname, "resource")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan());
app.use(cors());

// call middleware
const UploadController = require("./controller/uploadFile");
const insert = require("./middleware/searchDocument");

// use middleware
// if it handles the route, we call it controller, middleware is the sub-controller before the controller
app.use("/upload", UploadController);
app.use("/primary-info", insert);

const server = http.createServer(app)
server.listen(PORT, () => console.log("Server is running on port " + PORT));
