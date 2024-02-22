var express = require("express");
var router = express.Router();
var objController = require("../controllers/orthoAI_controller");
var ResponseObj = require("../models/global/response_object");
const scanFolder = process.env.SCAN_FOLDER;
const caseFolder = process.env.CASE_FOLDER;
//----------insert Media for ortho -----------------------//

router.post("/UploadScans", function (req, res) {
  try {
    objController.InsertOrthoMedia(req, res, scanFolder);
  } catch (exc) {
    res.status(408).json(ResponseObj.StatusResponse(408));
  }
});

router.post("/UploadCases", function (req, res) {
  try {
    objController.InsertOrthoMedia(req, res, caseFolder);
  } catch (exc) {
    res.status(408).json(ResponseObj.StatusResponse(408));
  }
});

router.get("/GetOrthos", function (req, res) {
  try {
    objController.GetOrthos(req, res);
  } catch (exc) {
    //res.status(408).json(ResponseObj.StatusResponse(408));
    res.status(408).json(ResponseObj.ObjectResponse(408, exc, "error"));
  }
});

module.exports = router;
