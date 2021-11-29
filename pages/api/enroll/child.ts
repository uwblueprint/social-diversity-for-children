import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client"; // Session handling
import { ResponseUtil } from "@utils/responseUtil";
import {
    createParentRegistration,
    deleteParentRegistration,
    getParentRegistration,
    getParentRegistrations,
} from "@database/enroll";
import { validateParentRegistrationRecord } from "@utils/validation/registration";
import { ParentRegistrationInput } from "models/Enroll";
import { roles } from "@prisma/client";
import { getUserFromEmail } from "@database/user";
import { getClass } from "@database/class";
import { getWaitlistRecordsByClassId } from "@database/waitlist";
import send from "services/nodemailer/mail";
import { openSpotWaitlistTemplate } from "@utils/mail/templateUtil";

/**
 * handle controls the request made to the enroll/child resource.
 * This endpoint is used when a parent is enrolling their child into a program
 * @param req API request object
 * @param res API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req });

    // If there is no session or the user is not a parent, not authorized
    if (!session) {
        return ResponseUtil.returnUnauthorized(
            res,
            "Only users with PARENT role can access this resource",
        );
    }

    const user = await getUserFromEmail(session.user.email);

    if (!user || user.role !== roles.PARENT) {
        return ResponseUtil.returnUnauthorized(
            res,
            "Only users with PARENT role can access this resource",
        );
    }

    const parentId = session.id as number;
    if (!parentId) {
        return ResponseUtil.returnBadRequest(res, "No user id stored in session");
    }

    switch (req.method) {
        case "GET": {
            // obtain query parameters
            const { studentId, classId } = req.query;

            // if no student or class query, we get all enrollments
            if (!studentId && !classId) {
                const parentRegistrationRecords = await getParentRegistrations(parentId);

                // verify that the parent registration record could be obtained
                if (!parentRegistrationRecords) {
                    return ResponseUtil.returnNotFound(
                        res,
                        "a registration entries was not found for the parent Id",
                    );
                }

                // return response
                ResponseUtil.returnOK(res, parentRegistrationRecords);
                return;
            }
            if (!studentId || !classId) {
                return ResponseUtil.returnBadRequest(
                    res,
                    "studentId and classId are required to obtain a program registration record",
                );
            }

            // parse query parameters from strings to numbers
            const studentIdNumber = parseInt(studentId as string, 10);
            const classIdNumber = parseInt(classId as string, 10);

            // verify that the query parameters were successfully converted to numbers
            if (isNaN(studentIdNumber) || isNaN(classIdNumber)) {
                return ResponseUtil.returnBadRequest(
                    res,
                    "studentId and classId should be passed in as numbers",
                );
            }

            // obtain the parent registration record
            const parentRegistrationRecord = await getParentRegistration(
                parentId,
                studentIdNumber,
                classIdNumber,
            );

            // verify that the parent registration record could be obtained
            if (!parentRegistrationRecord) {
                return ResponseUtil.returnNotFound(
                    res,
                    "a registration entry was not found for the studentId and classId",
                );
            }

            // return response
            ResponseUtil.returnOK(res, parentRegistrationRecord);
            break;
        }
        case "POST": {
            const parentRegistrationInput: ParentRegistrationInput = {
                parentId,
                studentId: req.body.studentId,
                classId: req.body.classId,
            };
            // validate the request body and return if not validated
            const validationErrors = validateParentRegistrationRecord(parentRegistrationInput);
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
                return;
            }

            // First, check if there is still space, if not, return conflict
            const enrollClass = await getClass(parentRegistrationInput.classId);
            if (enrollClass._count.parentRegs >= enrollClass.spaceTotal) {
                return ResponseUtil.returnConflict(res, "Class is full");
            }

            // create parent registration record and return if it could not be created
            const newRegistration = await createParentRegistration(parentRegistrationInput);
            if (!newRegistration) {
                ResponseUtil.returnBadRequest(res, `Registration could not be created`);
                return;
            }

            ResponseUtil.returnOK(res, newRegistration);
            break;
        }
        case "DELETE": {
            const parentRegistrationInput: ParentRegistrationInput = {
                parentId,
                studentId: req.body.studentId,
                classId: req.body.classId,
            };

            // validate the request body and return if not validated
            const validationErrors = validateParentRegistrationRecord(parentRegistrationInput);
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
                return;
            }

            const deletedRegistration = await deleteParentRegistration(parentRegistrationInput);
            if (!deletedRegistration) {
                ResponseUtil.returnBadRequest(res, `Registration could not be created`);
                return;
            }

            let notifyWaitlist = true;
            // if class wasn't originally full, do not notify waitlist
            if (
                deletedRegistration.class._count.parentRegs < deletedRegistration.class.spaceTotal
            ) {
                notifyWaitlist = false;
            }

            // check if there exists waitlist records for this class
            const waitlistRecords = await getWaitlistRecordsByClassId(
                parentRegistrationInput.classId,
            );
            // if there are, get class information & send email to all on waitlist
            if (notifyWaitlist && waitlistRecords.length > 0) {
                await Promise.all(
                    waitlistRecords.map((record) => {
                        const emailSubject = `Spot Available for Waitlisted Class: ${deletedRegistration.class.name}`;
                        return send(
                            process.env.EMAIL_FROM,
                            record.parent.user.email,
                            emailSubject,
                            openSpotWaitlistTemplate(
                                req.body.classId,
                                deletedRegistration.class.imageLink,
                                deletedRegistration.class.name,
                                deletedRegistration.class.weekday,
                                deletedRegistration.class.startDate,
                                deletedRegistration.class.endDate,
                                deletedRegistration.class.startTimeMinutes,
                                deletedRegistration.class.durationMinutes,
                                record.parent.preferredLanguage,
                            ),
                        );
                    }),
                );
            }

            ResponseUtil.returnOK(res, deletedRegistration);
            return;
        }
        default: {
            const allowedHeaders: string[] = ["GET", "POST", "DELETE"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
}
