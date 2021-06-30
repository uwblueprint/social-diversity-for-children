import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getPrograms, createProgram } from "@database/program";
import { createProgramInput } from "models/Program";
import { validateCreateProgram } from "@utils/validation/program";

/**
 * handle controls the request made to the program resource
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    switch (req.method) {
        case "GET": {
            const programs = await getPrograms();
            ResponseUtil.returnOK(res, programs);
            break;
        }
        case "POST": {
            // TODO:
            if (!validateCreateProgram(req.body as createProgramInput)) {
                ResponseUtil.returnBadRequest(
                    res,
                    `Required field(s) were not provided correctly.`,
                );
                break;
            } else {
                const newProgram = await createProgram(
                    req.body as createProgramInput,
                );

                if (!newProgram) {
                    ResponseUtil.returnBadRequest(
                        res,
                        `Program could not be created`,
                    );
                    break;
                }
                ResponseUtil.returnOK(res, newProgram);
                break;
            }
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
