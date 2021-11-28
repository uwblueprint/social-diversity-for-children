import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { createStudent, updateStudent } from "@database/student";
import { CreateStudentInput, UpdateStudentInput } from "@models/Student";
import { validateCreateStudent } from "@utils/validation/student";
import { getSession } from "next-auth/client";

/**
 * handle controls the request made to the student resource
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const session = await getSession({ req });

    // If there is no session or the user is not a parent, not authorized
    if (!session) {
        return ResponseUtil.returnUnauthorized(res, "Unauthorized");
    }

    // TODO: Allow admin access as well
    const parentId = session.id as number;
    if (!parentId) {
        return ResponseUtil.returnBadRequest(res, "No user id stored in session");
    }

    switch (req.method) {
        case "POST": {
            const input = req.body as CreateStudentInput;
            const validationErrors = await validateCreateStudent(input);
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
            } else {
                const student = await createStudent(input);
                if (!student) {
                    ResponseUtil.returnBadRequest(
                        res,
                        `Student could not be created`,
                    );
                    return;
                }
                ResponseUtil.returnOK(res, student);
            }
            break;
        }
        case "PUT": {
            const input = req.body as UpdateStudentInput;
            // Check if it matches parent id (current session), if not unauthorized
            // TODO: Allow admin access as well
            if (input.parentId !== parentId) {
                return ResponseUtil.returnUnauthorized(res, "Unauthorized");
            }

            const validationErrors = await validateCreateStudent(input);
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
            } else {
                const student = await updateStudent(input);
                if (!student) {
                    ResponseUtil.returnBadRequest(
                        res,
                        `Student could not be created`,
                    );
                    return;
                }
                ResponseUtil.returnOK(res, student);
            }
            break;
        }
        default: {
            const allowedHeaders: string[] = ["POST"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
            return;
        }
    }
}
