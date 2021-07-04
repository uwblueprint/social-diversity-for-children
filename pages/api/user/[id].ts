import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getUser, updateUser } from "@database/user";
import { getSession } from "next-auth/client";
import { UserInput } from "models/User";

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
        const userId = (session ? session.id : req.query.id) as string;
        // TODO: add user role to session
        const updatedUserData = {
            id: userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role,
            roleData: req.body.roleData,
        } as UserInput;
        const updatedUser = await updateUser(updatedUserData);
        if (!updatedUser) {
            ResponseUtil.returnBadRequest(
                res,
                `Error updating user with id ${userId}.`,
            );
            return;
        }
        ResponseUtil.returnOK(res, updatedUser);
        return;
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
