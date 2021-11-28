import { updateProgramArchive } from "@database/program";
import { ResponseUtil } from "@utils/responseUtil";
import { isAdmin } from "@utils/session/authorization";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

/**
 * handle takes the program Id query and a isArchive param and return updated program along with classes
 * @param req API request object
 * @param res API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    // Obtain program id
    const { id } = req.query;
    const { isArchive }: { isArchive: boolean } = req.body;
    const session = await getSession({ req });

    // If there is no session or the user is not an admin user, not authorized
    if (!isAdmin(session)) {
        return ResponseUtil.returnUnauthorized(res, "Unauthorized");
    }

    //parse query parameters from string to number and validate that id is a number
    const pid = parseInt(id as string);
    if (isNaN(pid)) {
        return ResponseUtil.returnBadRequest(res, "classId should be passed in as numbers");
    }

    switch (req.method) {
        case "PUT": {
            const program = await updateProgramArchive(pid, isArchive);

            if (!program) {
                return ResponseUtil.returnNotFound(res, `Program with id ${id} not found.`);
            }
            ResponseUtil.returnOK(res, program);
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
