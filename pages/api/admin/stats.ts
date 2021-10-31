import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getRegistrantCount, getTeacherCount } from "@database/user";
import { getStudentCount } from "@database/student";
import { getProgramCount } from "@database/program";
import { getClassCount } from "@database/class";
import { getSession } from "next-auth/client";
import { roles } from ".prisma/client";

/**
 * handle controls the request made to the admin stats resources
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const session = await getSession({ req });

    // If there is no session or the user is not a parent, not authorized
    if (
        !session ||
        ![roles.PROGRAM_ADMIN, roles.TEACHER].includes((session as any).role)
    ) {
        return ResponseUtil.returnUnauthorized(res, "Unauthorized");
    }

    switch (req.method) {
        case "GET": {
            // Contains the registrants - parent + students + volunteers
            const totalRegistrants =
                (await getRegistrantCount()) + (await getStudentCount());
            const totalPrograms = await getProgramCount();
            const totalClasses = await getClassCount();
            const totalTeachers = await getTeacherCount();

            ResponseUtil.returnOK(res, {
                totalRegistrants,
                totalPrograms,
                totalClasses,
                totalTeachers,
            });
            break;
        }
        default: {
            const allowedHeaders: string[] = ["GET"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
}