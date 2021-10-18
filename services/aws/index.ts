import aws from "aws-sdk";
import { AWSError } from "aws-sdk";
import S3, { ManagedUpload } from "aws-sdk/clients/s3";

// Update AWS Config
aws.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REG,
    signatureVersion: "v4",
});

// configure AWS SDK
const ses = new aws.SES({
    apiVersion: "2010-12-01",
});

// Set up S3
const s3 = new aws.S3();

// Set up SSM to access Paramter Store for Zoom link
const ssm = new aws.SSM({
    apiVersion: "2010-12-01",
    region: "us-east-1",
});

export { aws, ses, s3, ssm };
export type { S3, AWSError, ManagedUpload };
