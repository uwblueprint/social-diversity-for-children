import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getClasses, createClass } from "@database/class";
import { CreateClassInput } from "@models/Class";
import { validateCreateClass } from "@utils/validation/class";

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
            const input = req.body as CreateClassInput;
            const validationErrors = validateCreateClass(input);
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
            } else {
                const newClass = await createClass(
                    req.body as CreateClassInput,
                );
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
        case "PUT": {
            // TODO:
            break;
        }
        default: {
            const allowedHeaders: string[] = ["GET", "POST", "PUT"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
    return;
}
