const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const http = require('http')
const app = express();
const PORT = process.env.PORT || 5000

// app use
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// require middleware
const upload = require("./api/middleware/uploadFile");

// use middleware
app.use("/upload", upload);

const server = http.createServer(app)
server.listen(PORT, () => console.log("success"))
module.exports = app;