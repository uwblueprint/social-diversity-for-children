import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { deleteProgram, updateProgram } from "@database/program";
import { ProgramInput } from "models/Program";
import { validateProgramData } from "@utils/validation/program";
import { getProgramCardInfo } from "@database/program-card-info";

/**
 * handle takes the programId parameter and returns
 * the program associated with the programId
 * @param req API request object
 * @param res API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    switch (req.method) {
        case "GET": {
            const { id: programId, archived } = req.query;

            if (!programId) {
                return ResponseUtil.returnBadRequest(
                    res,
                    "programId required to obtain program info",
                );
            }

            const programIdNumber = parseInt(programId as string, 10);
            if (isNaN(programIdNumber)) {
                return ResponseUtil.returnBadRequest(
                    res,
                    "programId should be passed in as numbers",
                );
            }

            const result = await getProgramCardInfo(
                programId as string,
                Boolean(JSON.parse(archived as string)),
            );
            if (!result) {
                return ResponseUtil.returnNotFound(res, `Program info not found.`);
            }
            ResponseUtil.returnOK(res, result);
            break;
        }
        case "DELETE": {
            // Obtain program id
            const { id: programId } = req.query;
            if (!programId) {
                return ResponseUtil.returnBadRequest(
                    res,
                    "programId required to obtain program info",
                );
            }

            const programIdNumber = parseInt(programId as string, 10);
            if (isNaN(programIdNumber)) {
                return ResponseUtil.returnBadRequest(
                    res,
                    "programId should be passed in as numbers",
                );
            }
            // Delete program with provided programId
            const program = await deleteProgram(programId as string);

            if (!program) {
                ResponseUtil.returnNotFound(res, `Program with id ${programId} not found.`);
                break;
            }
            ResponseUtil.returnOK(res, program);
            break;
        }
        case "PUT": {
            // validate new body
            const validationError = validateProgramData(req.body as ProgramInput);
            if (validationError.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationError.join(", "));
                break;
            }
            // Obtain program id
            const { id } = req.query;
            // Obtain the entire update body
            const program = await updateProgram(id as string, req.body as ProgramInput);

            if (!program) {
                ResponseUtil.returnNotFound(res, `Program with id ${id} not found.`);
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
