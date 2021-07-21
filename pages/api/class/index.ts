import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getClasses, createClass } from "@database/class";
import { ClassInput } from "@models/Class";
import { validateClassData } from "@utils/validation/class";

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
            const classes = await getClasses();
            ResponseUtil.returnOK(res, classes);
            break;
        }
        case "POST": {
            const input = req.body as ClassInput;
            const validationErrors = validateClassData(input);
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
            } else {
                const newClass = await createClass(req.body as ClassInput);
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
