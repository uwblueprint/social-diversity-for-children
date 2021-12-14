import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { deleteUser, getUser } from "@database/user";
import { isTeacher } from "@utils/session/authorization";
import { getSession } from "next-auth/client";
import { roles } from "@prisma/client";
import {
    getParentRegistrationsByTeacher,
    getVolunteerRegistrationsByTeacher,
} from "@database/enroll";

/**
 * handle takes the userId parameter and returns
 * the user associated with the userId
 * @param req API request object
 * @param res API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    // Obtain user id
    const { id } = req.query;
    const session = await getSession({ req });

    switch (req.method) {
        case "GET": {
            // obtain user with provided userId
            const user = await getUser(id as string);

            if (!user) {
                ResponseUtil.returnNotFound(res, `User with id ${id} not found.`);
                return;
            }

            if (isTeacher(session)) {
                if (user.role === roles.PARENT) {
                    const registrations = await getParentRegistrationsByTeacher(session.id);
                    user.parent.students = user.parent.students.filter((participant) =>
                        registrations.some(
                            (registration) => participant.id === registration.studentId,
                        ),
                    );
                    if (user.parent.students.length === 0) {
                        return ResponseUtil.returnUnauthorized(res, "No students in teacher class");
                    }
                } else if (user.role === roles.VOLUNTEER) {
                    const registrations = await getVolunteerRegistrationsByTeacher(session.id);
                    if (
                        !registrations.some((registration) => user.id === registration.volunteerId)
                    ) {
                        return ResponseUtil.returnUnauthorized(
                            res,
                            "Volunteer not in teacher class",
                        );
                    }
                } else {
                    return ResponseUtil.returnUnauthorized(
                        res,
                        "Teacher can only view participants in their classes",
                    );
                }
            }

            ResponseUtil.returnOK(res, user);
            return;
        }
        case "DELETE": {
            //  delete user with provided userId
            const user = await deleteUser(id as string);

            if (!user) {
                ResponseUtil.returnConflict(res, `User with id ${id} cannot be deleted.`);
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
