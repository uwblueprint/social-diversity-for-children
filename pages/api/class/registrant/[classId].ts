import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getClassRegistrants } from "@database/class";

/**
 * handle takes the classId parameter and returns class registrants
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    // Obtain class id
    const { classId } = req.query;

    //parse query parameters from string to number and validate that id is a number
    const id = parseInt(classId as string, 10);
    if (isNaN(id)) {
        return ResponseUtil.returnBadRequest(
            res,
            "classId should be passed in as numbers",
        );
    }

    if (req.method == "GET") {
        // obtain class with provided classId
        const classSection = await getClassRegistrants(id);

        if (!classSection) {
            ResponseUtil.returnNotFound(
                res,
                `Class with id ${classId} not found.`,
            );
            return;
        }
        ResponseUtil.returnOK(res, classSection);
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
