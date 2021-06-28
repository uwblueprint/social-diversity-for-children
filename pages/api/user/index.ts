import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import {
    getUsers,
    createTeacher,
    createParent,
    createProgramAdmin,
    createVolunteer,
} from "@database/user";

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
            res.status(200).json({});
            break;
        }
        case "POST": {
            let newUser;
            const userRole = req.body.role;
            // TODO (6/27/21): define these roles as an enum somewhere? but where?
            if (userRole === "PARENT") {
                newUser = createParent(req.body, userRole);
            } else if (userRole === "TEACHER") {
                newUser = createTeacher(req.body, userRole);
            } else if (userRole === "PROGRAM_ADMIN") {
                newUser = createProgramAdmin(req.body, userRole);
            } else if (userRole === "VOLUNTEER") {
                newUser = createVolunteer(req.body, userRole);
            }

            if (!newUser) {
                ResponseUtil.returnBadRequest(
                    res,
                    "User could not be created. Please verify that you have entered the information correctly.",
                );
            }
            ResponseUtil.returnOK(res, newUser);
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
