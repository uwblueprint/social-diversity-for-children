// Nodemailer with SES transport, more info here: https://nodemailer.com/transports/ses/
import { transporter } from "aws/index";

// send some mail
export default async function handler(req, res) {
    if (req.method == "POST") {
        await transporter.sendMail(
            {
                from: process.env.EMAIL_FROM,
                to: process.env.EMAIL_FROM, // only for testing, aws ses is in sandbox (recipient email must be verified)
                subject: "Test Message",
                text: "This is a test message from the SDC server!",
                ses: {
                    // optional extra arguments for SendRawEmail
                    Tags: [
                        {
                            Name: "tag_name",
                            Value: "tag_value",
                        },
                    ],
                },
            },
            (err, info) => {
                if (err) {
                    res.status(400).json({
                        status: "Error",
                        message: "Could not successfully send the email.",
                    });
                } else {
                    console.log(info.envelope);
                    console.log(info.messageId);
                    res.status(200).json({
                        status: "Success",
                        message: "Email has been sent!",
                    });
                }
            },
        );
    } else {
        res.status(405).json({
            status: "Error",
            message: "Method not allowed",
        });
    }
}
