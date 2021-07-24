import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getClass, deleteClass, updateClass } from "@database/class";
import { ClassInput } from "models/Class";
import { validateClassData } from "@utils/validation/class";

/**
 * handle takes the classId parameter and returns
 * the class associated with the classId
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    // Obtain class id
    const { id } = req.query;

    // verify that query parameters were passed in
    if (!id) {
        return ResponseUtil.returnBadRequest(
            res,
            "classId is required to obtain a class record",
        );
    }

    //parse query parameters from string to number and validate that id is a number
    const classId = parseInt(id as string, 10);
    if (isNaN(classId)) {
        return ResponseUtil.returnBadRequest(
            res,
            "classId should be passed in as numbers",
        );
    }

    if (req.method == "GET") {
        // obtain class with provided classId
        const classSection = await getClass(classId as number);

        if (!classSection) {
            ResponseUtil.returnNotFound(
                res,
                `Class with id ${classId} not found.`,
            );
            return;
        }
        ResponseUtil.returnOK(res, classSection);
        return;
    } else if (req.method == "DELETE") {
        const deletedClass = await deleteClass(classId as number);

        if (!deleteClass) {
            ResponseUtil.returnNotFound(
                res,
                `Class with id ${classId} not found.`,
            );
            return;
        }
        ResponseUtil.returnOK(res, deletedClass);
        return;
    } else if (req.method == "PUT") {
        // validate updated class body
        const classInput = req.body as ClassInput;
        const validationError = validateClassData(classInput);
        if (validationError.length !== 0) {
            ResponseUtil.returnBadRequest(res, validationError.join(", "));
            return;
        }
        // obtain the updated class body
        const updatedClass = await updateClass(classId as number, classInput);

        if (!updatedClass) {
            ResponseUtil.returnNotFound(
                res,
                `Class with id ${classId} not found.`,
            );
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
