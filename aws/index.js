import aws from "aws-sdk";
import nodemailer from "nodemailer";

// configure AWS SDK
const ses = new aws.SES({
    apiVersion: "2010-12-01",
});

// create Nodemailer SES transporter
export const transporter = nodemailer.createTransport({
    SES: { ses, aws },
});
