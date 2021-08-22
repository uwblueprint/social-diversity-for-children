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
        // finds all classes starting in 3 hours and 48 hours from now
        // as well as their associated parents/volunteers information
        const classesInThreeHours = await findEmails(firstIntervalHours);
        const classesInFortyEightHours = await findEmails(secondIntervalHours);
        // stores all promises for the nodemailer transport
        const mailerPromises = [];
        // storing all emails that need to be sent in mailerPromises (3h and 48h)
        pushMailPromises(
            classesInThreeHours,
            firstIntervalHours,
            mailerPromises,
        );
        pushMailPromises(
            classesInFortyEightHours,
            secondIntervalHours,
            mailerPromises,
        );

        // send all the reminder emails to the respective users
        await Promise.all(mailerPromises);
        // return status to the client (lambda function)
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

/**
 * Helper function to loop through classes and push them to an array
 * @param classes class object joined with parentRegs, volunteerRegs obtained from DB
 * @param intervalHours number of hours we are searching within to find the classes and parentRegs/volunteerRegs
 * @param mailerPromises array that stores promises of emails that need to be sent
 * @returns void, doesn't return anything
 */
function pushMailPromises(
    classes,
    intervalHours: number,
    mailerPromises: Promise<void>[],
): void {
    const emailSubject = `Reminder: Social Diversity for Children Class In ${intervalHours} Hours`;
    for (let i = 0; i < classes.length; ++i) {
        // looping through parents that are registered to EACH class
        const parentRegs = classes[i].parentRegs;
        const volunteerRegs = classes[i].volunteerRegs;
        for (let j = 0; j < parentRegs.length; ++j) {
            const emailBody = `<p>Hi ${parentRegs[j].parent.user.firstName},</p>
            <p>The class <b>${classes[i].name}</b> you signed up for is starting in ${intervalHours} hours!</p>
            <p>Regards, Social Diversity for Children</p>`;
            mailerPromises.push(
                send(
                    process.env.EMAIL_FROM,
                    parentRegs[j].parent.user.email,
                    emailSubject,
                    emailBody,
                ),
            );
        }
        // looping through volunteers that are registered to EACH class
        for (let j = 0; j < volunteerRegs.length; ++j) {
            const emailBody = `<p>Hi ${volunteerRegs[j].volunteer.user.firstName},</p>
            <p>The class ${classes[i].name} you signed up for is starting in ${intervalHours} hours!</p><br />
            <p>Regards, Social Diversity for Children</p>`;
            mailerPromises.push(
                send(
                    process.env.EMAIL_FROM,
                    volunteerRegs[j].volunteer.user.email,
                    emailSubject,
                    emailBody,
                ),
            );
        }
    }
    return;
}
