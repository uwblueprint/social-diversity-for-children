import { s3 } from "aws/index";
import fs from "fs";
import path from "path";

/**
 * Uploads a file to the AWS S3 bucket corresponding to env.AWS_BUCKET_NAME
 * @param {string} bucketName - Name of the bucket to upload the file to
 * @param {string} filePath - Path of the file to upload
 * @returns {promise} - S3 upload response object on resolve, error object on reject
 */
const uploadToS3 = (bucketName: string, filePath: string): Promise<any> => {
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
        Bucket: bucketName,
        Key: path.basename(filePath),
        Body: fileStream,
    };
    return s3
        .upload(uploadParams)
        .promise()
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });
};

export { uploadToS3 };
