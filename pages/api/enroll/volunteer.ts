import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client"; // Session handling
import { ResponseUtil } from "@utils/responseUtil";
import {
    createVolunteerRegistration,
    deleteVolunteerRegistration,
    getVolunteerRegistration,
    getVolunteerRegistrations,
} from "@database/enroll";
import { validateVolunteerRegistrationRecord } from "@utils/validation/registration";
import { VolunteerRegistrationInput } from "@models/Enroll";
import { roles } from "@prisma/client";

/**
 * handle controls the request made to the enroll/volunteer resource.
 * This endpoint is used when volunteer is enrolling into a class for the program
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const session = await getSession({ req });

    // If there is no session or the user is not a volunteer
    if (!session || session.role !== roles.VOLUNTEER) {
        return ResponseUtil.returnUnauthorized(
            res,
            "Only users with VOLUNTEER role can access this resource",
        );
    }

    const volunteerId = session.id as number;
    if (!volunteerId) {
        return ResponseUtil.returnBadRequest(
            res,
            "No user id stored in session",
        );
    }
    switch (req.method) {
        case "GET": {
            // obtain query parameters
            const { classId } = req.query;

            // Get all volunteer registrations if no class query
            if (!classId) {
                const volunteerRegistrationRecords =
                    await getVolunteerRegistrations(volunteerId);

                // verify that the volunteer registration record could be obtained
                if (!volunteerRegistrationRecords) {
                    return ResponseUtil.returnNotFound(
                        res,
                        "a registration entries was not found for the volunteer Id",
                    );
                }

                // return response
                ResponseUtil.returnOK(res, volunteerRegistrationRecords);
                return;
            }

            // parse query parameters from strings to numbers
            const classIdNumber = parseInt(classId as string, 10);

            // verify that the query parameters were successfully converted to numbers
            if (isNaN(classIdNumber)) {
                return ResponseUtil.returnBadRequest(
                    res,
                    "volunteerId and classId should be passed in as numbers",
                );
            }

            // obtain the volunteer registration record
            const volunteerRegistrationRecord = await getVolunteerRegistration(
                volunteerId,
                classIdNumber,
            );

            // verify that the volunteer registration record could be obtained
            if (!volunteerRegistrationRecord) {
                return ResponseUtil.returnNotFound(
                    res,
                    "a registration entry was not found for the volunteerId and classId",
                );
            }

            // return response
            ResponseUtil.returnOK(res, volunteerRegistrationRecord);
            break;
        }
        case "POST": {
            const volunteerRegistrationInput: VolunteerRegistrationInput = {
                volunteerId,
                classId: req.body.classId,
            };
            // validate the request body and return if not validated
            const validationErrors = validateVolunteerRegistrationRecord(
                volunteerRegistrationInput,
            );
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
                return;
            }

            // create volunteer registration record and return if it could not be created
            const newRegistration = createVolunteerRegistration(
                volunteerRegistrationInput,
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
            const volunteerRegistrationInput: VolunteerRegistrationInput = {
                volunteerId,
                classId: req.body.classId,
            };

            // validate the request body and return if not validated
            const validationErrors = validateVolunteerRegistrationRecord(
                volunteerRegistrationInput,
            );
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
                return;
            }

            const deletedRegistration = await deleteVolunteerRegistration(
                volunteerRegistrationInput,
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
