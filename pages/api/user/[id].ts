import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getUser, updateUser } from "@database/user";
import { getSession } from "next-auth/client";
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
    } else if (req.method == "PUT") {
        const session = await getSession({ req });
        const userId = session.id;
        const updatedUserData = {
            id: userId,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role: req.body.role,
            role_data: req.body.role_data,
        };
        const updatedUser = await updateUser(updatedUserData);
        if (!updatedUser) {
            ResponseUtil.returnBadRequest(
                res,
                `Error updating user with id ${userId}.`,
            );
        }
        ResponseUtil.returnOK(res, updatedUser);
    } else {
        const allowedHeaders: string[] = ["GET", "PUT"];
        ResponseUtil.returnMethodNotAllowed(
            res,
            allowedHeaders,
            `Method ${req.method} Not Allowed`,
        );
        return;
    }
}
