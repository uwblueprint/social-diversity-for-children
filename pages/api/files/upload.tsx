import aws from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
export default (req: NextApiRequest, res: NextApiResponse): void => {
    aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION,
        signatureVersion: "v4",
    });
    const s3 = new aws.S3();
    const filePath = "./sample.txt";
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
    // Call S3 to list the buckets
    // s3.listBuckets(function (err, data) {
    //     if (err) {
    //         console.log("Error", err);
    //     } else {
    //         console.log("Success", data.Buckets);
    //     }
    // });
    // const s3 = new aws.S3();
    // const post = s3.createPresignedPost({
    //     Bucket: process.env.AWS_BUCKET_NAME,
    //     Fields: {
    //         key: path.basename(filePath),
    //     },
    //     Expires: 60, // seconds - TODO: what is this for?
    //     Conditions: [
    //         ["content-length-range", 0, 1048576], // up to 1 MB
    //     ],
    // });
    // res.status(200).json(post);
    // Create the parameters for calling listObjects
    // const bucketParams = {
    //     Bucket: process.env.AWS_BUCKET_NAME,
    // };
    // // Call S3 to obtain a list of the objects in the bucket
    // s3.listObjects(bucketParams, function (err, data) {
    //     if (err) {
    //         console.log("Error", err);
    //     } else {
    //         console.log("Success", data);
    //     }
    // });
    // const signedUrlExpireSeconds = 60 * 5;
    // const url = s3.getSignedUrl("getObject", {
    //     Bucket: process.env.AWS_BUCKET_NAME,
    //     Key: path.basename(filePath),
    //     Expires: signedUrlExpireSeconds,
    // });
    // console.log(url);
    return;
};