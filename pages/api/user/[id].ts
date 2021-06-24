import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getUser } from "@database/user";
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
    if (req.method == "GET") {
        // Obtain user id
        const { id } = req.query;

        // obtain user with provided userId
        const user = await getUser(id as string);

        if (!user) {
            ResponseUtil.returnNotFound(res, `User with id ${id} not found.`);
            return;
        }
        ResponseUtil.returnOK(res, user);
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
