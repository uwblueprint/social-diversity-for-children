import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getClassRegistrants } from "@database/class";
import { getSession } from "next-auth/client";
import { isInternal } from "@utils/session/authorization";

/**
 * handle takes the classId parameter and returns class registrants
 * @param req API request object
 * @param res API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    // Obtain class id
    const { classId } = req.query;
    const session = await getSession({ req });

    // If there is no session or the user is not a internal user, not authorized
    if (!isInternal(session)) {
        return ResponseUtil.returnUnauthorized(res, "Unauthorized");
    }

    //parse query parameters from string to number and validate that id is a number
    const id = parseInt(classId as string, 10);
    if (isNaN(id)) {
        return ResponseUtil.returnBadRequest(res, "classId should be passed in as numbers");
    }

    switch (req.method) {
        case "GET": {
            // obtain class with provided classId
            const classSection = await getClassRegistrants(id);

            if (!classSection) {
                return ResponseUtil.returnNotFound(res, `Class with id ${classId} not found.`);
            }
            ResponseUtil.returnOK(res, classSection);
            break;
        }
        default: {
            const allowedHeaders: string[] = ["GET"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
            break;
        }
    }
    return;
}
