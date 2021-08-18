import { ResponseUtil } from "@utils/responseUtil";
import type { NextApiRequest, NextApiResponse } from "next";
import send from "@utils/sendMail";
import findEmails from "@database/mail";

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
    if (req.method == "POST" && req.body.key == process.env.AWS_LAMBDA_KEY) {
        // AWS_LAMBDA_SECRET
        const result3h = await findEmails(3);
        const result48h = await findEmails(48);
        for (let i = 0; i < result3h.length; ++i) {
            for (let j = 0; j < result3h[i].parentRegs.length; ++j) {
                await send(
                    result3h[i].parentRegs[j].parent.user.email,
                    "Reminder: Social Diversity for Children Class In 3 Hours",
                    `Hi ${result3h[i].parentRegs[j].parent.user.firstName}, the class ${result3h[i].name} you signed up for is starting in 3 hours! Regards, Social Diversity for Children`,
                );
            }
            for (let j = 0; j < result3h[i].volunteerRegs.length; ++j) {
                await send(
                    result3h[i].volunteerRegs[j].volunteer.user.email,
                    "",
                    "",
                );
            }
        }
        for (let i = 0; i < result48h.length; ++i) {
            for (let j = 0; j < result48h[i].parentRegs.length; ++j) {
                await send(
                    result48h[i].parentRegs[j].parent.user.email,
                    "",
                    "",
                );
            }
            for (let j = 0; j < result48h[i].volunteerRegs.length; ++j) {
                await send(
                    result48h[i].volunteerRegs[j].volunteer.user.email,
                    "",
                    "",
                );
            }
        }
        ResponseUtil.returnOK(res, "The emails have been successfully sent!");
        return;
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
