import nodemailer from "nodemailer";
import { aws, ses } from "@aws";

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
    SES: { ses, aws },
});

export { transporter };
