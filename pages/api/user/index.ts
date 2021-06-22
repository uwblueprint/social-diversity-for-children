import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/response";
import { getUsers } from "@database/user";

// TODO: Type the response data
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const responseUtil = new ResponseUtil();
    switch (req.method) {
        case "GET": {
            const users = await getUsers();
            responseUtil.returnSuccess(res, undefined, users);
            res.status(200).json({});
            break;
        }
        case "POST": {
            // TODO:
            break;
        }
        case "PUT": {
            // TODO:
            break;
        }
        case "DELETE": {
            // TODO:
            break;
        }
        default:
            res.setHeader("ALLOW", ["GET", "POST", "PUT", "DELETE"]);
            // TODO: add JSON response for method not allowed
            responseUtil.returnMethodNotAllowed(
                res,
                `Method ${req.method} Not Allowed`,
            );
    }
    return;
}
