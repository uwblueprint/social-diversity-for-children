import { ResponseUtil } from "@utils/responseUtil";
import { weekdayToString } from "@utils/enum/weekday";
import type { NextApiRequest, NextApiResponse } from "next";
import send from "services/nodemailer/mail";
import findEmails from "@database/mail";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import { classStartingSoonTemplate } from "@utils/mail/templateUtil";
import { locale } from "@prisma/client";

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
    // LAMBDA_SECRET_KEY is needed as an environment variable
    // to restrict this endpoint to only the AWS Lambda requests
    if (req.method == "POST" && req.body.key == process.env.LAMBDA_SECRET_KEY) {
        const firstIntervalHours = 3;
        const secondIntervalHours = 48;
        // finds all classes starting in 3 hours and 48 hours from now
        // as well as their associated parents/volunteers information
        const classesInThreeHours = await findEmails(firstIntervalHours);
        const classesInFortyEightHours = await findEmails(secondIntervalHours);
        // stores all promises for the nodemailer transport
        const mailerPromises = [];
        // storing all emails that need to be sent in mailerPromises (3h and 48h)
        pushMailPromises(classesInThreeHours, firstIntervalHours, mailerPromises);
        pushMailPromises(classesInFortyEightHours, secondIntervalHours, mailerPromises);

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
            `Method ${req.method} Not Allowed without key`,
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
function pushMailPromises(classes, intervalHours: number, mailerPromises: Promise<void>[]): void {
    for (let i = 0; i < classes.length; ++i) {
        // looping through parents that are registered to EACH class
        const parentRegs = classes[i].parentRegs;
        const volunteerRegs = classes[i].volunteerRegs;
        const { name, imageLink, weekday, startDate, endDate, startTimeMinutes, durationMinutes } =
            classes[i];
        const getEmailSubject = (language: locale = locale.en) =>
            `Class Reminder: ${name} ${weekdayToString(
                weekday,
                language,
            )} ${convertToShortTimeRange(startTimeMinutes, durationMinutes)}`;

        (parentRegs as any[]).forEach((reg) => {
            mailerPromises.push(
                send(
                    process.env.EMAIL_FROM,
                    reg.parent.user.email,
                    getEmailSubject(reg.parent.preferredLanguage),
                    classStartingSoonTemplate(
                        intervalHours,
                        imageLink,
                        name,
                        weekday,
                        startDate,
                        endDate,
                        durationMinutes,
                        reg.parent.preferredLanguage,
                    ),
                ),
            );
        });
        (volunteerRegs as any[]).forEach((reg) => {
            mailerPromises.push(
                send(
                    process.env.EMAIL_FROM,
                    reg.volunteer.user.email,
                    getEmailSubject(
                        reg.volunteer.preferredLanguage
                            ? reg.volunteer.preferredLanguage
                            : undefined,
                    ),
                    classStartingSoonTemplate(
                        intervalHours,
                        imageLink,
                        name,
                        weekday,
                        startDate,
                        endDate,
                        durationMinutes,
                        reg.volunteer.preferredLanguage
                            ? reg.volunteer.preferredLanguage
                            : undefined,
                    ),
                ),
            );
        });
    }
}
