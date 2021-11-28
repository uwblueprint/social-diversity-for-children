import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { deleteUser, getUser } from "@database/user";

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
    // Obtain user id
    const { id } = req.query;

    switch (req.method) {
        case "GET": {
            // obtain user with provided userId
            const user = await getUser(id as string);

            if (!user) {
                ResponseUtil.returnNotFound(
                    res,
                    `User with id ${id} not found.`,
                );
                return;
            }
            ResponseUtil.returnOK(res, user);
            return;
        }
        case "DELETE": {
            //  delete user with provided userId
            const user = await deleteUser(id as string);

            if (!user) {
                ResponseUtil.returnConflict(
                    res,
                    `User with id ${id} cannot be deleted.`,
                );
                return;
            }
            ResponseUtil.returnOK(res, user);
            return;
        }
        default: {
            const allowedHeaders: string[] = ["GET"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
            return;
        }
    }
}
