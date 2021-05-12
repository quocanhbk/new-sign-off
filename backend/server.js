const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");

// init database
const approval = require("./models/allModels");

// call controller
const UploadController = require("./controller/uploadFile");

// app use
app.use(express.static(path.join(__dirname, "resource")));
app.use(express.json());
app.use(morgan());

// use middleware
// if it handles the route, we call it controller, middleware is the sub-controller before the controller
app.use("/upload", UploadController);

app.listen(PORT, () => console.log("Server is running on port " + PORT));
