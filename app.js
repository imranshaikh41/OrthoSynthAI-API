const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
var cors = require("cors");
const process = require("process");

const ResponseObj = require("./models/global/response_object");
const dotenv = require("dotenv");

//Configue ENV
dotenv.config();
global.__basedir = __dirname;

// Create express app
const app = express();

// Adding CORS
app.use(cors());
app.options("*", cors());

//Enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Define path of main directory to save images
app.use(express.static(path.join(__dirname, "public")));

// Define the routes
app.use("/api/ortho", require("./routes/orthoAI"));

app.get("/health", async (req, res) => {
  return res.send("Welcome To OrthoSynthAI API");
});

app.get("/", async (req, res) => {
  return res.send("Welcome To OrthoSynthAI REST API");
});

process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
});
// Listen to port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function () {
  console.log("Server started successfully at port: " + port);
});
