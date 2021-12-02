import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { createProgram } from "@database/program";
import { ProgramInput, ProgramTranslationData } from "models/Program";
import { validateProgramData } from "@utils/validation/program";
import { getProgramCardInfos } from "@database/program-card-info";

/**
 * handle controls the request made to the program resource
 * @param req API request object
 * @param res API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    switch (req.method) {
        case "GET": {
            const { archived } = req.query;

            const result = await getProgramCardInfos(
                Boolean(JSON.parse((archived as string) || "false")),
            );
            if (!result) {
                ResponseUtil.returnNotFound(res, `Program info not found.`);
                return;
            }
            ResponseUtil.returnOK(res, result);
            break;
        }
        case "POST": {
            const validationError = validateProgramData(req.body as ProgramInput);
            if (validationError.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationError.join(", "));
            } else {
                const newProgram = await createProgram(
                    req.body.programData as ProgramInput,
                    req.body.translationData as ProgramTranslationData,
                );
                if (!newProgram) {
                    ResponseUtil.returnBadRequest(res, `Program could not be created`);
                    break;
                }
                ResponseUtil.returnOK(res, newProgram);
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
