import aws from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse): void => {
    aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION,
        signatureVersion: "v4",
    });

    const s3 = new aws.S3();
    const post = s3.createPresignedPost({
        Bucket: process.env.BUCKET_NAME,
        Fields: {
            key: req.query.file,
        },
        Expires: 60, // seconds - TODO: what is this for?
        Conditions: [
            ["content-length-range", 0, 1048576], // up to 1 MB
        ],
    });

    res.status(200).json(post);
    return;
};
