import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getRegistrantCount, getTeacherCount } from "@database/user";
import { getStudentCount } from "@database/student";
import { getProgramCount } from "@database/program";
import { getClassCount } from "@database/class";

/**
 * handle controls the request made to the admin stats resources
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    // TODO: Admin access lock

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
