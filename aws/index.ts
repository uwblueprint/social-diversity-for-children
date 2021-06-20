import aws from "aws-sdk";
import nodemailer from "nodemailer";

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

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
    SES: { ses, aws },
});

// Set up S3
const s3 = new aws.S3();

export { transporter, s3 };
