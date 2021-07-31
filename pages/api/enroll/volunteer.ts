import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
// import {
//     createParentRegistration,
//     getParentRegistration,
// } from "@database/enroll";
// import { validateParentRegistrationRecord } from "@utils/validation/parentRegistration";
// import { ParentRegistrationInput } from "@models/Enroll";

/**
 * handle controls the request made to the enroll/volunteer resource.
 * This endpoint is used when a parent is enrolling volunteer into a class for the program
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    switch (req.method) {
        case "GET": {
            // obtain query parameters
            const { volunteerId, classId } = req.query;

            // verify that query parameters were passed in
            if (!volunteerId || !classId) {
                return ResponseUtil.returnBadRequest(
                    res,
                    "volunteerId and classId are required to obtain a program registration record",
                );
            }

            // parse query parameters from strings to numbers
            const volunteerIdNumber = parseInt(volunteerId as string, 10);
            const classIdNumber = parseInt(studentId as string, 10);

            // verify that the query parameters were successfully converted to numbers
            if (isNaN(volunteerIdNumber) || isNaN(classIdNumber)) {
                return ResponseUtil.returnBadRequest(
                    res,
                    "studentId and classId should be passed in as numbers",
                );
            }

            // obtain the parent registration record
            const parentRegistrationRecord = await getParentRegistration(
                volunteerIdNumber,
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
            // validate the request body and return if not validated
            const validationErrors = validateParentRegistrationRecord(
                req.body as ParentRegistrationInput,
            );
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
                return;
            }

            // create parent registration record and return if it could not be created
            const newRegistration = createParentRegistration(
                req.body as ParentRegistrationInput,
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
        default: {
            const allowedHeaders: string[] = ["GET", "POST"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
}
