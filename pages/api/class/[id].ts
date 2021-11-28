import { deleteClass, getClass, updateClass } from "@database/class";
import { ResponseUtil } from "@utils/responseUtil";
import { isAdmin } from "@utils/session/authorization";
import { validateClassData } from "@utils/validation/class";
import { ClassInput } from "models/Class";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

/**
 * handle takes the classId parameter and returns
 * the class associated with the classId
 * @param req API request object
 * @param res API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    // Obtain class id
    const { id } = req.query;
    const session = await getSession({ req });

    //parse query parameters from string to number and validate that id is a number
    const classId = parseInt(id as string, 10);
    if (isNaN(classId)) {
        return ResponseUtil.returnBadRequest(res, "classId should be passed in as numbers");
    }

    if (req.method == "GET") {
        // obtain class with provided classId
        const classSection = await getClass(classId);

        if (!classSection) {
            ResponseUtil.returnNotFound(res, `Class with id ${classId} not found.`);
            return;
        }
        ResponseUtil.returnOK(res, classSection);
        return;
    } else if (req.method == "DELETE") {
        // If there is no session or the user is not a internal user, not authorized
        if (!isAdmin(session)) {
            return ResponseUtil.returnUnauthorized(res, "Unauthorized");
        }
        const deletedClass = await deleteClass(classId);

        if (!deleteClass) {
            ResponseUtil.returnNotFound(res, `Class with id ${classId} not found.`);
            return;
        }
        ResponseUtil.returnOK(res, deletedClass);
        return;
    } else if (req.method == "PUT") {
        if (!isAdmin(session)) {
            return ResponseUtil.returnUnauthorized(res, "Unauthorized");
        }

        // validate updated class body
        const classInput = req.body as ClassInput;
        const validationError = validateClassData(classInput);
        if (validationError.length !== 0) {
            ResponseUtil.returnBadRequest(res, validationError.join(", "));
            return;
        }
        // obtain the updated class body
        const updatedClass = await updateClass(classId, classInput);

        if (!updatedClass) {
            ResponseUtil.returnNotFound(res, `Class with id ${classId} not found.`);
            return;
        }
        ResponseUtil.returnOK(res, updatedClass);
        return;
    } else {
        const allowedHeaders: string[] = ["GET", "DELETE", "PUT"];
        ResponseUtil.returnMethodNotAllowed(
            res,
            allowedHeaders,
            `Method ${req.method} Not Allowed`,
        );
        return;
    }
}
