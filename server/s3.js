require("dotenv").config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");

const { AWS_BUCKET_NAME, AWS_REGION, AWS_SECRET_CODE, AWS_ACCESS_ID } = process.env;

const s3 = new aws.S3({
  accessKeyId: AWS_ACCESS_ID,
  secretAccessKey: AWS_SECRET_CODE,
  Bucket: AWS_BUCKET_NAME,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, req.s3Key);
    },
  }),
});

const singleFileUpload = upload.single("image");

const uploadToS3 = (req, res) => {
  req.s3Key = uuidv4();
  let downloadUrl = `https://s3-${AWS_REGION}.amazonaws.com/${AWS_BUCKET_NAME}/${req.s3Key}`;

  return new Promise((resolve, reject) => {
    return singleFileUpload(req, res, (err) => {
      if (err) reject(err);
      return resolve(downloadUrl);
    });
  });
};

module.exports = { uploadToS3 };
