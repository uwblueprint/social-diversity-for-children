import { ManagedUpload } from "aws-sdk/clients/s3";
import { s3 } from "aws/index";
import fs from "fs";
import path from "path";

/**
 * Uploads a file to the AWS S3 bucket corresponding to env.AWS_BUCKET_NAME
 * @param {string} bucketName - Name of the bucket to upload the file to
 * @param {string} filePath - Path of the file to upload
 * @returns {object} - S3 upload response data
 */
const uploadToS3 = (bucketName: string, filePath: string): Promise<any> => {
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
        Bucket: bucketName,
        Key: path.basename(filePath),
        Body: fileStream,
    };

    const s3Upload = s3.upload(uploadParams).promise();
    return s3Upload;
};

export { uploadToS3 };
