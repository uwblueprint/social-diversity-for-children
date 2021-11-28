import { updateClassArchive } from "@database/class";
import { ResponseUtil } from "@utils/responseUtil";
import { isAdmin } from "@utils/session/authorization";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

/**
 * handle takes the classId query and a isArchive param and returns updates class archive column
 * @param req API request object
 * @param res API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    // Obtain class id
    const { classId } = req.query;
    const { isArchive }: { isArchive: boolean } = req.body;
    const session = await getSession({ req });

    // If there is no session or the user is not an admin user, not authorized
    if (!isAdmin(session)) {
        return ResponseUtil.returnUnauthorized(res, "Unauthorized");
    }

    //parse query parameters from string to number and validate that id is a number
    const id = parseInt(classId as string);
    if (isNaN(id)) {
        return ResponseUtil.returnBadRequest(res, "classId should be passed in as numbers");
    }

    switch (req.method) {
        case "PUT": {
            // obtain class with provided classId after updating archive column
            const classSection = await updateClassArchive(id, isArchive);

            if (!classSection) {
                return ResponseUtil.returnNotFound(res, `Class with id ${classId} not found.`);
            }
            ResponseUtil.returnOK(res, classSection);
            break;
        }
        default: {
            const allowedHeaders: string[] = ["PUT"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
    return;
}
