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
    if (req.method == "GET") {
        // obtain class with provided classId
        const classSection = await getClass(id as string);

        if (!classSection) {
            ResponseUtil.returnNotFound(res, `Class with id ${id} not found.`);
            return;
        }
        ResponseUtil.returnOK(res, classSection);
        return;
    } else if (req.method == "DELETE") {
        const deletedClass = await deleteClass(id as string);

        if (!deleteClass) {
            ResponseUtil.returnNotFound(res, `Class with id ${id} not found.`);
            return;
        }
        ResponseUtil.returnOK(res, deletedClass);
        return;
    } else if (req.method == "PUT") {
        // validate updated class body
        const validationError = validateClassData(req.body as ClassInput);
        if (validationError.length !== 0) {
            ResponseUtil.returnBadRequest(res, validationError.join(", "));
            return;
        }
        // obtain class id
        const { id } = req.query;
        // obtain the updated class body
        const updatedClass = await updateClass(
            id as string,
            req.body as ClassInput,
        );

        if (!updatedClass) {
            ResponseUtil.returnNotFound(res, `Class with id ${id} not found.`);
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
