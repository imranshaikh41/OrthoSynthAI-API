const { response } = require("express");
var ResponseObj = require("../models/global/response_object");
var Common = require("../utils/common");
const common = require("../utils/common");

//----------------------------------------------//

var InsertOrthoMedia = async (req, res, folderName) => {
  console.log("file scan", req.files);
  try {
    var MediaUrl;
    var MediaName;
    var file;
    if (req.files) {
      file = req.files.Media;
      MediaUrl = await Common.SaveUserMedia(folderName, file)
        .then((response) => {
          res
            .status(200)
            .json(
              ResponseObj.ObjectResponse(
                200,
                { message: "File uploaded successfully", URL: response },
                "OrthoMedia"
              )
            );
        })
        .catch((error) => {
          res
            .status(404)
            .json(ResponseObj.ObjectResponse(404, error, "OrthoMedia"));
        });
    } else {
      res
        .status(400)
        .json(
          ResponseObj.ObjectResponse(
            400,
            { error: "Please Select file to Upload" },
            "error"
          )
        );
    }
  } catch (error) {
    res.status(408).json(ResponseObj.ObjectResponse(408, error, "error"));
  }
};

//------------------------------GetOrthos----------------------------------------------------//

var GetOrthos = async (req, res) => {
  try {
    const data = await common.GetOrthoData();
    //  console.log("data", data);
    if (data) {
      res.status(200).json(ResponseObj.ObjectResponse(200, data, "OrthoData"));
    } else {
      res.status(408).json(ResponseObj.StatusResponse(408));
    }
  } catch (exc) {
    // console.log("exc", exc);
    res.status(408).json(ResponseObj.ObjectResponse(408, exc, "error"));
  }
};

//----------------exports Files --------------------------------//

module.exports = {
  InsertOrthoMedia: InsertOrthoMedia,
  GetOrthos: GetOrthos,
};
