import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getUsers } from "@database/user";
/**
 * handle controls the request made to the user resource
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    switch (req.method) {
        case "GET": {
            const users = await getUsers();
            ResponseUtil.returnOK(res, users);
            break;
        }
        case "POST": {
            break;
        }
        case "PUT": {
            //TODO:
            break;
        }
        case "DELETE": {
            // TODO:
            break;
        }
        default: {
            const allowedHeaders: string[] = ["GET", "POST", "PUT", "DELETE"];
            // TODO: add JSON response for method not allowed
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
    return;
}
