import { s3, S3, AWSError, ManagedUpload } from "services/aws/index";
import fs from "fs";
import path from "path";

/**
 * Retrieves a file from a S3 Bucket
 * @param {string} bucketName Name of the bucket to retrieve the file from
 * @param {string} fileKey The key of the file in the bucket
 * @returns {S3.GetObjectOutput} A promise which can be resolved to obtain the file from S3 and catch
 * any errors in making the get call
 */
const getFileFromS3 = (
    bucketName: string,
    fileKey: string,
): Promise<S3.GetObjectOutput> => {
    return new Promise<S3.GetObjectOutput>((resolve, reject) => {
        const retrieveParams = {
            Bucket: bucketName,
            Key: fileKey,
        };

        s3.getObject(
            retrieveParams,
            function (err: AWSError, data: S3.GetObjectOutput) {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            },
        );
    });
};

/**
 * Uploads a file to an AWS S3 Bucket
 * @param {string} bucketName Name of the bucket to upload the file to
 * @param {string} filePath Path of the file to upload
 * @returns {Promise<ManagedUpload.SendData>} A promise which can be resolved to obtain the S3 Upload
 * Information and can catch any errors in making the upload call
 */
const uploadFileToS3 = (
    bucketName: string,
    filePath: string,
): Promise<ManagedUpload.SendData> => {
    return new Promise<ManagedUpload.SendData>((resolve, reject) => {
        // create file stream from file path
        const fileStream = fs.createReadStream(filePath);

        // set up upload parameters
        const uploadParams = {
            Bucket: bucketName,
            Key: path.basename(filePath),
            Body: fileStream,
        };

        // upload file
        s3.upload(uploadParams, function (err: Error, data: ManagedUpload.SendData) {
            // reject errors if there are any
            if (err) {
                return reject(err);
            }

            // resolve the data object if there are no errors
            return resolve(data);
        });
    });
};

/**
 * Deletes a file from a S3 Bucket
 * @param {string} bucketName Name of the bucket to delete the file from
 * @param {string} fileKey The key of the file in the bucket
 * @returns {S3.GetObjectOutput} A promise which can be resolved to obtain the deletion information
 * from S3 and catch any errors in making the get call
 */
const deleteFileFromS3 = (
    bucketName: string,
    fileKey: string,
): Promise<S3.DeleteObjectOutput> => {
    return new Promise<S3.DeleteObjectOutput>((resolve, reject) => {
        const deleteParams = {
            Bucket: bucketName,
            Key: fileKey,
        };

        s3.deleteObject(
            deleteParams,
            function (err: AWSError, data: S3.DeleteObjectOutput) {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            },
        );
    });
};

/**
 * Get presigned post object for file upload to be used in client side
 * @param  {string} bucketName
 * @param  {string} fileKey
 * @returns S3.PresignedPost object representing url and fields required to upload file
 */
const getPresignedPostForUpload = (
    bucketName: string,
    fileKey: string,
): S3.PresignedPost => {
    const fileSizeLimitBytes = 5000000; // up to ~5MB

    return s3.createPresignedPost({
        Bucket: bucketName,
        Fields: {
            key: fileKey,
        },
        Conditions: [["content-length-range", 0, fileSizeLimitBytes]],
    });
};
/**
 * Get signed url to retrieve file to be used on the client side
 * @param  {string} bucketName
 * @param  {string} fileKey
 * @returns string the url to retrieve the requested file
 */
const getSignedUrlForRetrieve = (bucketName: string, fileKey: string): string => {
    const secIn5Min = 60 * 5;

    return s3.getSignedUrl("getObject", {
        Bucket: bucketName,
        Key: fileKey,
        Expires: secIn5Min,
    });
};

export {
    uploadFileToS3,
    getFileFromS3,
    deleteFileFromS3,
    getPresignedPostForUpload,
    getSignedUrlForRetrieve,
};
