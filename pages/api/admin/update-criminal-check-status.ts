import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { updateVolunteerCriminalCheckApproval } from "@database/user";
import { getSession } from "next-auth/client";
import { isAdmin } from "@utils/session/authorization";

/**
 * handle controls the request made to the api/admin/criminal-check-update endpoint
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const session = await getSession({ req });

    // If there is no session or the user is not a parent, not authorized
    if (!session || !isAdmin(session)) {
        return ResponseUtil.returnUnauthorized(res, "Unauthorized");
    }

    switch (req.method) {
        case "POST": {
            const input = req.body;
            const volunteerId = input.id as number;
            const criminalCheckApproval = input.approval as boolean;
            const recordApproval = await updateVolunteerCriminalCheckApproval(
                volunteerId,
                criminalCheckApproval,
            );

            ResponseUtil.returnOK(res, { recordApproval });
            break;
        }
        default: {
            const allowedHeaders: string[] = ["POST"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
}
