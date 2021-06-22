import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getUser } from "../../../services/database/user";
// TODO: Type the response data
/**
 * handle takes the userId parameter and returns
 * the user associated with the userId
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const responseUtil = new ResponseUtil();
    if (req.method == "GET") {
        // Obtain user id
        const { id } = req.query;

        // obtain user with provided userId
        const user = await getUser(id as string);

        if (!user) {
            responseUtil.returnNotFound(
                res,
                "User with provided id not found.",
            );
            return;
        }
        responseUtil.returnSuccess(res, undefined, user);
        return;
    } else {
        res.setHeader("Allow", ["GET"]);
        // TODO: add JSON response for method not allowed

        responseUtil.returnMethodNotAllowed(
            res,
            `Method ${req.method} Not Allowed`,
        );
        return;
    }
}
