import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getClass, deleteClass } from "@database/class";

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
        // obtain program with provided programId
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
    } else {
        const allowedHeaders: string[] = ["GET"];
        ResponseUtil.returnMethodNotAllowed(
            res,
            allowedHeaders,
            `Method ${req.method} Not Allowed`,
        );
        return;
    }
}
