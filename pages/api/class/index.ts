import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getClasses, createClass } from "@database/class";
import { ClassInput } from "@models/Class";
import { validateClassData } from "@utils/validation/class";
import { getClassInfoWithProgramId } from "@database/program-card-info";
import { locale } from ".prisma/client";

/**
 * handle controls the request made to the class resource
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    switch (req.method) {
        case "GET": {
            const { id: programId } = req.query;

            if (!programId) {
                const classes = await getClasses();
                ResponseUtil.returnOK(res, classes);
            } else {
                const programIdNumber = parseInt(programId as string, 10);
                if (isNaN(programIdNumber)) {
                    return ResponseUtil.returnBadRequest(
                        res,
                        "programId should be passed in as numbers",
                    );
                }
                const classes = await getClassInfoWithProgramId(
                    programId as string,
                    locale.en,
                ); // TODO don't hardcode locale
                ResponseUtil.returnOK(res, classes);
            }
            break;
        }
        case "POST": {
            const classInput = req.body as ClassInput;
            const validationErrors = validateClassData(classInput);
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
            } else {
                const newClass = await createClass(classInput);
                if (!newClass) {
                    ResponseUtil.returnBadRequest(
                        res,
                        `Class could not be created`,
                    );
                    break;
                }
                ResponseUtil.returnOK(res, newClass);
            }
            break;
        }
        default: {
            const allowedHeaders: string[] = ["GET", "POST"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
    return;
}
