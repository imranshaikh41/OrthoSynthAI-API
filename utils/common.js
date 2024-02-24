const aws = require("aws-sdk");
require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const scanFolder = process.env.SCAN_FOLDER;
const augmentedFolder = process.env.AUGMENTED_FOLDER;

const caseFolder = process.env.CASE_FOLDER;
const SITE_IMAGE_URL = process.env.SITE_IMAGE_URL;
const s3 = new aws.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
});

//------------------Save File -------------------------------------------//

var SaveUserMedia = async (FolderName, file) => {
  try {
    return new Promise(function (resolve, reject) {
      const fileName = `${new Date().getTime()}_${file.name}`;
      const mimetype = file.mimetype;
      var ImagePath = `${bucketName}/${FolderName}`;

      const params = {
        Bucket: ImagePath,
        Key: fileName,
        Body: file.data,
        ContentType: mimetype,
        ACL: "public-read",
      };

      s3.upload(params, function (err, data) {
        if (err) {
          return reject({ error: err.message });
        }
        // console.log("Data Image", data);
        // console.log(
        //   "Custom Image URL:",
        //   `${SITE_IMAGE_URL}/${FolderName}/${fileName}`
        // );
        return resolve(`https://${SITE_IMAGE_URL}/${FolderName}/${fileName}`);
      });
    });
  } catch (err) {
    //  console.log(err.message);
  }
};

var GetOrthoData = async () => {
  let ScanFile = [];
  ScanFile = await GetOrthoFiles(scanFolder);
  let CaseFile = [];
  CaseFile = await GetOrthoFiles(caseFolder);
  let AugmentedFile = [];
  AugmentedFile = await GetOrthoFiles(augmentedFolder);

  const FinalData = [
    {
      // Scan: { data: ScanFile, count: ScanFile.length },
      // Case: { data: CaseFile, count: CaseFile.length },
      // Augmented: { data: AugmentedFile, count: AugmentedFile.length },
      // All: {
      //   data: [...CaseFile, ...ScanFile, ...AugmentedFile],
      //   count: CaseFile.length + ScanFile.length + AugmentedFile.length,
      // },

      Scan: { count: ScanFile.length },
      Case: { count: CaseFile.length },
      Augmented: { count: AugmentedFile.length },
      All: {
        count: CaseFile.length + ScanFile.length + AugmentedFile.length,
      },
    },
  ];

  return FinalData;
};
var GetOrthoFiles = async (folderName) => {
  try {
    const bucket = `${bucketName}/${folderName}`;
    return new Promise(function (resolve, reject) {
      s3.listObjectsV2(
        { Bucket: bucketName, Prefix: folderName },
        function (err, data) {
          if (err) {
            console.log(err);
            return reject({ error: err.message });
          }

          const ScanFile = [];
          data.Contents.forEach(function (obj, index) {
            if (obj.Size > 0) {
              obj.Key = `https://${SITE_IMAGE_URL}/${obj.Key}`;
              ScanFile.push(obj);
            }
          });

          // alldata.push({ folderName: ScanFile });
          return resolve(ScanFile);
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
};
//----------------------------------------------------------------------------------//

//----------------------------------------//

module.exports = {
  SaveUserMedia: SaveUserMedia,
  GetOrthoData: GetOrthoData,
};
