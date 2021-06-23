import aws from "aws-sdk";

// Update AWS Config
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: "v4",
});

// configure AWS SDK
const ses = new aws.SES({
    apiVersion: "2010-12-01",
});

// Set up S3
const s3 = new aws.S3();

export { aws, ses, s3 };
