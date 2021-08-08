import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getUsers } from "@database/user";
import { getSession } from "next-auth/client";
import { UserInput } from "@models/User";
import { updateUser } from "@database/user";
import { getUserValidationErrors } from "@utils/validation/user";

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
            // TODO
            break;
        }
        case "PUT": {
            const session = await getSession({ req });
            const userId = session.id as string;
            // TODO: add user role to session
            const updatedUserData: UserInput = {
                id: userId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role,
                roleData: req.body.roleData,
            };
            const validationErrors = getUserValidationErrors(updatedUserData);
            if (validationErrors) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
            }
            const updatedUser = await updateUser(updatedUserData);
            if (!updatedUser) {
                ResponseUtil.returnBadRequest(
                    res,
                    `Error updating user with id ${userId}.`,
                );
                return;
            }
            ResponseUtil.returnOK(res, updatedUser);
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
