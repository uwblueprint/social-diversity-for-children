import { s3 } from "services/aws/index";
import fs from "fs";
import path from "path";
import { ManagedUpload } from "aws-sdk/clients/s3";

/**
 * Uploads a file to an AWS S3 Bucket
 * @param {string} bucketName Name of the bucket to upload the file to
 * @param {string} filePath Path of the file to upload
 * @returns {Promise<ManagedUpload.SendData | Error>} A promise which can be resolved to obtain the S3 Upload
 * Information and can catch any errors in making the upload call
 */
const uploadToS3 = (
    bucketName: string,
    filePath: string,
): Promise<ManagedUpload.SendData | Error> => {
    return new Promise((resolve, reject) => {
        // create file stream from file path
        const fileStream = fs.createReadStream(filePath);

        // set up upload parameters
        const uploadParams = {
            Bucket: bucketName,
            Key: path.basename(filePath),
            Body: fileStream,
        };

        // upload file
        s3.upload(
            uploadParams,
            function (err: Error, data: ManagedUpload.SendData) {
                // reject errors if there are any
                if (err) {
                    return reject(err);
                }

                // resolve the data object if there are no errors
                return resolve(data);
            },
        );
    });
};

export { uploadToS3 };
