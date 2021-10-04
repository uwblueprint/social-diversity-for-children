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
import { locale, roles } from "@prisma/client";

/**
 * handle controls the request made to the enroll/child resource.
 * This endpoint is used when a parent is enrolling their child into a program
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const session = await getSession({ req });

    // If there is no session or the user is not a parent
    if (!session || session.role !== roles.PARENT) {
        return ResponseUtil.returnUnauthorized(
            res,
            "Only users with PARENT role can access this resource",
        );
    }

    const parentId = session.id as number;
    if (!parentId) {
        return ResponseUtil.returnBadRequest(
            res,
            "No user id stored in session",
        );
    }

    switch (req.method) {
        case "GET": {
            // obtain query parameters
            const { studentId, classId } = req.query;

            // if no student or class query, we get all enrollments
            if (!studentId && !classId) {
                const parentRegistrationRecords = await getParentRegistrations(
                    parentId,
                    locale.en, // TODO: dynamic locale
                );

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
            const validationErrors = validateParentRegistrationRecord(
                parentRegistrationInput,
            );
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
                return;
            }

            // create parent registration record and return if it could not be created
            const newRegistration = createParentRegistration(
                parentRegistrationInput,
            );
            if (!newRegistration) {
                ResponseUtil.returnBadRequest(
                    res,
                    `Registration could not be created`,
                );
                return;
            }

            ResponseUtil.returnOK(res);
            break;
        }
        case "DELETE": {
            const parentRegistrationInput: ParentRegistrationInput = {
                parentId,
                studentId: req.body.studentId,
                classId: req.body.classId,
            };

            // validate the request body and return if not validated
            const validationErrors = validateParentRegistrationRecord(
                parentRegistrationInput,
            );
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
                return;
            }

            const deletedRegistration = await deleteParentRegistration(
                parentRegistrationInput,
            );
            if (!deletedRegistration) {
                ResponseUtil.returnBadRequest(
                    res,
                    `Registration could not be created`,
                );
                return;
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
