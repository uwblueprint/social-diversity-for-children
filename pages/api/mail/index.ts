import { ResponseUtil } from "@utils/responseUtil";
import type { NextApiRequest, NextApiResponse } from "next";
import send from "services/nodemailer/mail";
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
        const firstIntervalHours = 3;
        const secondIntervalHours = 48;
        // finds all classes starting in 2-4 and 47-49 hours from now
        // as well as their associated parents/volunteers information
        const classesInThreeHours = await findEmails(firstIntervalHours);
        const classesInFortyEightHours = await findEmails(secondIntervalHours);
        // stores all promises for the nodemailer transport
        const mailerPromises = [];
        // looping through all the classes starting in three hours
        for (let i = 0; i < classesInThreeHours.length; ++i) {
            // looping through parents that are registered to EACH class
            const parentRegs = classesInThreeHours[i].parentRegs;
            const volunteerRegs = classesInThreeHours[i].volunteerRegs;
            for (let j = 0; j < parentRegs.length; ++j) {
                mailerPromises.push(
                    send(
                        process.env.EMAIL_FROM,
                        parentRegs[j].parent.user.email,
                        "Reminder: Social Diversity for Children Class In 3 Hours",
                        `<p>Hi ${parentRegs[j].parent.user.firstName},</p>
                        <p>The class <b>${classesInThreeHours[i].name}</b> you signed up for is starting in 3 hours!</p>
                        <p>Regards, Social Diversity for Children</p>`,
                    ),
                );
            }
            // looping through volunteers that are registered to EACH class
            for (let j = 0; j < volunteerRegs.length; ++j) {
                mailerPromises.push(
                    send(
                        process.env.EMAIL_FROM,
                        volunteerRegs[j].volunteer.user.email,
                        "Reminder: Social Diversity for Children Class In 3 Hours",
                        `<p>Hi ${volunteerRegs[j].volunteer.user.firstName},</p>
                        <p>The class ${classesInThreeHours[i].name} you signed up for is starting in 3 hours!</p><br />
                        <p>Regards, Social Diversity for Children</p>`,
                    ),
                );
            }
        }
        // looping through all the classes starting in forty-eight hours
        for (let i = 0; i < classesInFortyEightHours.length; ++i) {
            // looping through parents that are registered to EACH class
            const parentRegs = classesInFortyEightHours[i].parentRegs;
            const volunteerRegs = classesInFortyEightHours[i].volunteerRegs;
            for (let j = 0; j < parentRegs.length; ++j) {
                mailerPromises.push(
                    send(
                        process.env.EMAIL_FROM,
                        parentRegs[j].parent.user.email,
                        "Reminder: Social Diversity for Children Class In 48 Hours",
                        `<p>Hi ${parentRegs[j].parent.user.firstName},</p>
                        <p>The class ${classesInFortyEightHours[i].name} you signed up for is starting in 48 hours!</p><br />
                        <p>Regards, Social Diversity for Children</p>`,
                    ),
                );
            }
            // looping through volunteers that are registered to EACH class
            for (let j = 0; j < volunteerRegs.length; ++j) {
                mailerPromises.push(
                    send(
                        process.env.EMAIL_FROM,
                        volunteerRegs[j].volunteer.user.email,
                        "Reminder: Social Diversity for Children Class In 48 Hours",
                        `<p>Hi ${volunteerRegs[j].volunteer.user.firstName},</p>
                        <p>The class ${classesInFortyEightHours[i].name} you signed up for is starting in 48 hours!</p><br />
                        <p>Regards, Social Diversity for Children</p>`,
                    ),
                );
            }
        }
        // send all the reminder emails to the respective users
        await Promise.all(mailerPromises);
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
