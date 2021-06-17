import aws from "aws-sdk";

// Update AWS Config
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: "v4",
});

// Set up S3
const s3 = new aws.S3();

export { s3 };
