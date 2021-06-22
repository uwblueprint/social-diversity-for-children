// Nodemailer with SES transport, more info here: https://nodemailer.com/transports/ses/
import { transporter } from "@aws";
import { ResponseUtil } from "@utils/responseUtil";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Sends an email to the targetAddress email from the process.env.EMAIL_FROM email
 * @param targetAddress the email address we want to send to (string)
 * @param subject email subject/title (string)
 * @param text email body (string)
 * @returns Promise<void>
 */
async function sendEmail(
    targetAddress: string,
    subject: string,
    text: string,
): Promise<void> {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: targetAddress,
        subject: subject,
        text: text,
        ses: {},
    });
}

/**
 * Handles the request to /api/mail (POST)
 * @param req request object
 * @param res response object
 * @returns Promise<void> and sends json object back to the client (type: ResponseObject)
 */
export default async function mailHandler(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const response = new ResponseUtil();
    if (req.method == "POST") {
        // TODO: this is hardcoded for now until AWS is not sandboxed (change to sendEmail(req.body.targetEmail))
        await sendEmail(
            process.env.EMAIL_FROM,
            "Test Message",
            "This is a test message from the SDC server!",
        )
            .then(() => {
                response.returnSuccess(
                    res,
                    "The email has successfully been sent!",
                );
                return;
            })
            .catch((err) => {
                response.returnBadRequest(
                    res,
                    "There was an error sending the email",
                );
                return;
            });
    } else {
        res.setHeader("Allow", ["POST"]);
        response.returnMethodNotAllowed(
            res,
            `Method ${req.method} Not Allowed`,
        );
        return;
    }
}
