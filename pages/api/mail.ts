// Nodemailer with SES transport, more info here: https://nodemailer.com/transports/ses/
import { transporter } from "aws/index";
import { ResponseObject } from "src/models/response";

/**
 * Sends an email to the targetAddress email from the process.env.EMAIL_FROM email
 * @param targetAddress the email address we want to send to (string)
 * @returns nothing
 */
export async function sendEmail(targetAddress: string) {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: targetAddress, // only for testing, aws ses is in sandbox (recipient email must be verified)
        subject: "Test Message",
        text: "This is a test message from the SDC server!",
        ses: {},
    });
}

/**
 * Handles the request to /api/mail (POST)
 * @param req request object
 * @param res response object
 * @returns json object back to the client (type: ResponseObject)
 */
export default async function mailHandler(req, res) {
    if (req.method == "POST") {
        // this is hardcoded for now until AWS is not sandboxed (change to sendEmail(req.body.targetEmail))
        await sendEmail(process.env.EMAIL_FROM)
            .then(() => {
                const successResponse: ResponseObject = {
                    status: 200,
                    message: "The email has successfully been sent!",
                };
                res.status(200).json(successResponse);
            })
            .catch((err) => {
                const errorResponse: ResponseObject = {
                    status: 400,
                    message: "There was an error sending the email",
                };
                res.status(400).json(errorResponse);
            });
    } else {
        res.setHeader("Allow", ["POST"]);
        const methodErrorResponse: ResponseObject = {
            status: 405,
            message: `Method ${req.method} Not Allowed`,
        };
        res.status(405).end(methodErrorResponse);
    }
}
