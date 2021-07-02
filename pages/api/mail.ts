import { sendEmail } from "@nodemailer/mail";
import { ResponseUtil } from "@utils/responseUtil";
import type { NextApiRequest, NextApiResponse } from "next";

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
    if (req.method == "POST") {
        // TODO: this is hardcoded for now until AWS is not sandboxed
        // (change to sendEmail(req.body.targetEmail))
        await sendEmail(
            process.env.EMAIL_FROM,
            process.env.EMAIL_FROM,
            "Test Message",
            "This is a test message from the SDC server!",
        )
            .then(() => {
                ResponseUtil.returnOK(
                    res,
                    "The email has successfully been sent!",
                );
                return;
            })
            .catch((err) => {
                ResponseUtil.returnBadRequest(
                    res,
                    `There was an error sending the email: ${err}`,
                );
                return;
            });
    } else {
        const allowedHeaders: string[] = ["POST"];
        ResponseUtil.returnMethodNotAllowed(
            res,
            allowedHeaders,
            `Method ${req.method} Not Allowed`,
        );
        return;
    }
}
