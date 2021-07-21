import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { createStudent } from "@database/student";
import { CreateStudentInput } from "@models/Student";
import { validateCreateStudent } from "@utils/validation/student";

/**
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    if (req.method == "POST") {
        const input = req.body as CreateStudentInput;
        const validationErrors = await validateCreateStudent(input);
        if (validationErrors.length !== 0) {
            ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
        } else {
            const student = await createStudent(input);
            if (!student) {
                ResponseUtil.returnBadRequest(
                    res,
                    `Student could not be created`,
                );
                return;
            }
            ResponseUtil.returnOK(res, student);
        }
    } else {
        const allowedHeaders: string[] = ["POST"];
        ResponseUtil.returnMethodNotAllowed(
            res,
            allowedHeaders,
            `Method ${req.method} Not Allowed`,
        );
        return;
    }
}
