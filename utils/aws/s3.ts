import aws from "aws-sdk";
import fs from "fs";
import path from "path";

const S3 = new aws.S3();

/* 

Uploads a file to the AWS S3 bucket corresponding to AWS_BUCKET_NAME in .env.
    
filePath: the path of the file to upload

If upload fails, returns the error. Otherwise, it returns the response data.

Sample usage:
    myFile = "~/documents/my_file.txt"
    res = uploadToS3(myFile)

*/
const uploadToS3 = (filePath: string): void => {
    aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION,
        signatureVersion: "v4",
    });

    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: path.basename(filePath),
        Body: fileStream,
    };
    S3.upload(uploadParams, function (err, data) {
        if (err) {
            return err;
        }
        return data;
    });
};

export { S3, uploadToS3 };
