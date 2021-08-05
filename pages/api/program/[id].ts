import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { deleteProgram, updateProgram } from "@database/program";
import { ProgramInput } from "models/Program";
import { validateProgramData } from "@utils/validation/program";
import {
    getProgramCardInfos,
    getProgramCardInfo,
} from "@database/programcardinfo";
/**
 * handle takes the programId parameter and returns
 * the program associated with the programId
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    switch (req.method) {
        case "GET": {
            const { id } = req.query;
            const result = await getProgramCardInfo(id as string);
            if (!result) {
                ResponseUtil.returnNotFound(res, `Program info not found.`);
                break;
            }
            ResponseUtil.returnOK(res, result);
            break;
        }
        case "DELETE": {
            // Obtain program id
            const { id } = req.query;
            // Delete program with provided programId
            const program = await deleteProgram(id as string);

            if (!program) {
                ResponseUtil.returnNotFound(
                    res,
                    `Program with id ${id} not found.`,
                );
                break;
            }
            ResponseUtil.returnOK(res, program);
            break;
        }
        case "PUT": {
            // validate new body
            const validationError = validateProgramData(
                req.body as ProgramInput,
            );
            if (validationError.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationError.join(", "));
                break;
            }
            // Obtain program id
            const { id } = req.query;
            // Obtain the entire update body
            const program = await updateProgram(
                id as string,
                req.body as ProgramInput,
            );

            if (!program) {
                ResponseUtil.returnNotFound(
                    res,
                    `Program with id ${id} not found.`,
                );
                break;
            }
            ResponseUtil.returnOK(res, program);
            break;
        }
        default: {
            const allowedHeaders: string[] = ["GET", "DELETE", "PUT"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
            break;
        }
    }
}
