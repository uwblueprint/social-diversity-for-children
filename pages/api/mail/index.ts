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
    // AWS_LAMBDA_KEY is needed as an environment variable
    // to restrict this endpoint to only the AWS Lambda requests
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
    for (let i = 0; i < classes.length; ++i) {
        // looping through parents that are registered to EACH class
        const parentRegs = classes[i].parentRegs;
        const volunteerRegs = classes[i].volunteerRegs;
        for (let j = 0; j < parentRegs.length; ++j) {
            const classStartDate = classes[i].startDate;
            const emailSubject = `Class Reminder: ${
                classes[i].name
            } ${getWeekday(classes[i].weekday)}s ${getHours(
                classStartDate,
            ).slice(0, -2)}-${getHours(
                classStartDate.setHours(classStartDate.getHours() + 1),
            )}`;
            // TODO: Zoom link + contact/unregister included in the body
            const emailBody = `
            <head>
            <link
                href="https://fonts.googleapis.com/css?family=Poppins"
                rel="stylesheet"
            />
            <style>
                body {
                    font-family: "Poppins";
                }
            </style>
            </head>
            <body style="background-color: #fff; padding: 30px;">
            <p style="font-size: 30px"><img src=https://images.squarespace-cdn.com/content/5e83092341f99d6d384777ef/1592547010897-WF00319AKLJCVGJZC3ZK/sdc+logo+with+name+alt.png?content-type=image%2Fpng
            style="width: 250px; padding-bottom: 10px; color: #0c53a0" alt="SDC Logo"/></p>
            <h2><b>Your class is starting in ${intervalHours} hours!</b></h2>
            <h4>This is an automatic reminder for the following class:</h4>
            <img src=${classes[i].imageLink} style="width: 68px; height: 77px;"/>
            <p>Regards, Social Diversity for Children</p>
            </body>
            `;
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
            const classStartDate = classes[i].startDate;
            const emailSubject = `Class Reminder: ${
                classes[i].name
            } ${getWeekday(classes[i].weekday)}s ${getHours(
                classStartDate,
            ).slice(0, -2)}-${getHours(
                classStartDate.setHours(classStartDate.getHours() + 1),
            )}`;
            const emailBody = `
            <head>
            <link
                href="https://fonts.googleapis.com/css?family=Poppins"
                rel="stylesheet"
            />
            <style>
                body {
                    font-family: "Poppins";
                }
            </style>
            </head>
            <body style="background-color: #fff; padding: 30px;">
            <p style="font-size: 30px"><img src=https://images.squarespace-cdn.com/content/5e83092341f99d6d384777ef/1592547010897-WF00319AKLJCVGJZC3ZK/sdc+logo+with+name+alt.png?content-type=image%2Fpng
            style="width: 250px; padding-bottom: 10px; color: #0c53a0" alt="SDC Logo"/></p>
            <h2><b>Your class is starting in ${intervalHours} hours!</b></h2>
            <h4>This is an automatic reminder for the following class:</h4>
            <img src=${classes[i].imageLink} style="width: 68px; height: 77px;"/>
            <p>Regards, Social Diversity for Children</p>
            </body>
            `;
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

/**
 * Helper function to get the hour of a date in 12 hour format
 * @param d date object from DB
 * @returns the start time of a class (hour)
 */
function getHours(d: Date): string {
    return new Date(d)
        .toLocaleDateString("en-US", { hour: "numeric", hour12: true })
        .split(",")[1];
}

/**
 * Helper function to convert ENUM (MON, TUE, WED, etc) to Monday, Tuesday, etc.
 * @param d date object from DB
 * @returns the start time of a class (hour)
 */
function getWeekday(w: string): string {
    switch (w) {
        case "MON":
            return "Monday";
        case "TUE":
            return "Tuesday";
        case "WED":
            return "Wednesday";
        case "THU":
            return "Thursday";
        case "FRI":
            return "Friday";
        case "SAT":
            return "Saturday";
        case "SUN":
            return "Sunday";
    }
}
