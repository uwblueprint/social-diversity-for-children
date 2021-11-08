import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getSession } from "next-auth/client";
import { roles } from "@prisma/client";
import { updateClassArchive } from "@database/class";

/**
 * handle takes the classId query and a isArchive param and returns updates class archive column
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    // Obtain class id
    const { classId } = req.query;
    const { isArchive }: { isArchive: boolean } = req.body;
    const session = await getSession({ req });

    // If there is no session or the user is not a internal user, not authorized
    if (!session || ![roles.PROGRAM_ADMIN].includes((session as any).role)) {
        return ResponseUtil.returnUnauthorized(res, "Unauthorized");
    }

    //parse query parameters from string to number and validate that id is a number
    const id = parseInt(classId as string, 10);
    if (isNaN(id)) {
        return ResponseUtil.returnBadRequest(
            res,
            "classId should be passed in as numbers",
        );
    }

    if (req.method == "PUT") {
        // obtain class with provided classId after updating archive column
        const classSection = await updateClassArchive(id, isArchive);

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
        const allowedHeaders: string[] = ["PUT"];
        ResponseUtil.returnMethodNotAllowed(
            res,
            allowedHeaders,
            `Method ${req.method} Not Allowed`,
        );
        return;
    }
}
