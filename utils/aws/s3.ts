import aws from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";
import fs from "fs";
import path from "path";

const S3 = new aws.S3();

/**
 * Uploads a file to the AWS S3 bucket corresponding to env.AWS_BUCKET_NAME
 * @param {string} filePath - Path of the file to upload
 * @returns {object} - S3 upload response data
 */

const uploadToS3 = (filePath: string): ManagedUpload => {
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: path.basename(filePath),
        Body: fileStream,
    };

    const res = S3.upload(uploadParams, function (err, data) {
        console.log(err, data);
    });

    return res;
};

export { uploadToS3 };
