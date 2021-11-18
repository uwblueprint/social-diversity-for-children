import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { createUser, getUsers } from "@database/user";
import { getSession } from "next-auth/client";
import { roles, UserInput } from "@models/User";
import { updateUser } from "@database/user";
import { getUserValidationErrors } from "@utils/validation/user";
import isEmail from "validator/lib/isEmail";

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
            // Creation of users should only be done for teachers and admins explicitly
            const session = await getSession({ req });
            if (
                !session ||
                ![roles.PROGRAM_ADMIN].includes((session as any).role)
            ) {
                return ResponseUtil.returnUnauthorized(res, "Unauthorized");
            }
            const createUserData: UserInput = {
                firstName: req.body.firstName,
                email: req.body.email,
                lastName: req.body.lastName,
                role: req.body.role,
            };

            if (!isEmail(createUserData.email)) {
                return ResponseUtil.returnBadRequest(res, "Invalid user email");
            }

            const createdUser = await createUser(createUserData);
            if (!createdUser) {
                ResponseUtil.returnBadRequest(res, `Error creating user.`);
                return;
            }
            ResponseUtil.returnOK(res, createdUser);
            break;
        }
        case "PUT": {
            const session = await getSession({ req });
            const userId = session.id as string;
            const updatedUserData: UserInput = {
                id: userId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role,
                roleData: req.body.roleData,
            };
            const validationErrors = getUserValidationErrors(updatedUserData);
            if (validationErrors.length > 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
                return;
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
