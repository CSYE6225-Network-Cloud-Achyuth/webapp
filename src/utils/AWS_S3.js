import * as dotenv from "dotenv";
import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";

dotenv.config();

const bucketName = process.env.AWS_S3_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region: bucketRegion,
  accessKeyId,
  secretAccessKey,
});

function upload(file, fileName) {
  const fileStream = fs.createReadStream(file.path);
  return s3
    .upload({
      Bucket: bucketName,
      Body: fileStream,
      Key: fileName,
    })
    .promise();
}

function deleteTheFile(fileName) {
  return s3.deleteObject({ Bucket: bucketName, Key: fileName }).promise();
}

export { upload, deleteTheFile };
