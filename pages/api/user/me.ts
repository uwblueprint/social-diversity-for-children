import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getUserFromEmail } from "@database/user";
import { getSession } from "next-auth/client";

/**
 * handle controls the request made to the current user resource
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const session = await getSession({ req });

    switch (req.method) {
        case "GET": {
            // If no session, return unauthorized error
            if (!session) {
                ResponseUtil.returnUnauthorized(res, "No session");
                return;
            }

            // This should be a me query
            if (!session) {
                ResponseUtil.returnBadRequest(res, "Invalid Session");
            }
            const user = await getUserFromEmail(session?.user.email);
            if (!user) {
                ResponseUtil.returnBadRequest(res, "Invalid User");
            }

            ResponseUtil.returnOK(res, user);

            break;
        }
        default: {
            const allowedHeaders: string[] = ["GET"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
    return;
}
