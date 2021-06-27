import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getPrograms, createProgram } from "@database/program";
import { Program } from "models/Program";

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
            res.status(200).json({});
            break;
        }
        case "POST": {
            // TODO:
            const newProgram = await createProgram(req.body as Program);

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
