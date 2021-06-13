require('dotenv').config();
var aws = require("aws-sdk");
var fs = require("fs");
var path = require("path");

//TODO: Update to typescript

export function s3Upload(filePath) {
    aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION,
        signatureVersion: "v4",
    });
    const s3 = new aws.S3();
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: path.basename(filePath),
        Body: fileStream,
    };
    s3.upload(uploadParams, function (err, data) {
        if (err) {
            console.log("ERROR: ", err);
        } else {
            console.log("SUCCESS: ", data.Location);
        }
    });
}
