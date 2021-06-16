import aws from "aws-sdk";
import nodemailer from "nodemailer";

// write to aws config
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// configure AWS SDK
const ses = new aws.SES({
    apiVersion: "2010-12-01",
});

// create Nodemailer SES transporter
export const transporter = nodemailer.createTransport({
    SES: { ses, aws },
});
