import { ResponseUtil } from "@utils/responseUtil";
import weekdayToString from "@utils/weekdayToString";
import getHours, { getSimpleDate } from "@utils/timeUtil";
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
            } ${weekdayToString(classes[i].weekday)}s ${getHours(
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
            <body style="background-color: #fff; padding: 30px; position: absolute">
                <p style="font-size: 30px"><img src=https://images.squarespace-cdn.com/content/5e83092341f99d6d384777ef/1592547010897-WF00319AKLJCVGJZC3ZK/sdc+logo+with+name+alt.png?content-type=image%2Fpng
                    style="width: 250px; padding-bottom: 10px; color: #0c53a0" alt="SDC Logo"/></p>
                <span style="font-style: normal;
                    font-weight: bold;
                    font-size: 24px;
                    line-height: 36px;">Your class is starting in ${intervalHours} hours!</span>
                <p style="font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 24px;">This is an automatic reminder for the following class:</p>
                <span
                    style="
                    padding-left:100px;width:375px;font-weight:Bold;font-size:16px;
                    "
                    >${classes[i].name}</span
                    ><br><span
                    style="
                    padding-left:100px;width:30px;color:rgba(115,115,115,1);font-size:14px;
                    "
                    >${weekdayToString(classes[i].weekday)}s ${getHours(
                classStartDate,
            ).slice(0, -2)}-${getHours(
                classStartDate.setHours(classStartDate.getHours() + 1),
            )} </span> <br> <span style="padding-left:100px;width:30px;color:rgba(115,115,115,1);font-size:14px;"> ${getSimpleDate(
                classes[i].startDate,
            )} to ${getSimpleDate(classes[i].endDate)} </span>
                <div style="width:68px;height:77px;background:url('${
                    classes[i].imageLink
                }'); display: flex; background-size:cover;"></div>
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
            } ${weekdayToString(classes[i].weekday)}s ${getHours(
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
            <body style="background-color: #fff; padding: 30px; position: absolute">
                <p style="font-size: 30px"><img src=https://images.squarespace-cdn.com/content/5e83092341f99d6d384777ef/1592547010897-WF00319AKLJCVGJZC3ZK/sdc+logo+with+name+alt.png?content-type=image%2Fpng
                    style="width: 250px; padding-bottom: 10px; color: #0c53a0" alt="SDC Logo"/></p>
                <span style="font-style: normal;
                    font-weight: bold;
                    font-size: 24px;
                    line-height: 36px;">Your class is starting in ${intervalHours} hours!</span>
                <p style="font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 24px;">This is an automatic reminder for the following class:</p>
                <span
                    style="
                    padding-left:100px;width:375px;font-weight:Bold;font-size:16px;
                    "
                    >${classes[i].name}</span
                    ><br><span
                    style="
                    padding-left:100px;width:30px;color:rgba(115,115,115,1);font-size:14px;
                    "
                    >${weekdayToString(classes[i].weekday)}s ${getHours(
                classStartDate,
            ).slice(0, -2)}-${getHours(
                classStartDate.setHours(classStartDate.getHours() + 1),
            )} </span> <br> <span style="padding-left:100px;width:30px;color:rgba(115,115,115,1);font-size:14px;"> ${getSimpleDate(
                classes[i].startDate,
            )} to ${getSimpleDate(classes[i].endDate)} </span>
                <div style="width:68px;height:77px;background:url('${
                    classes[i].imageLink
                }'); display: flex; background-size:cover;"></div>
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
