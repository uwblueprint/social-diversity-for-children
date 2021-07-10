import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getProgram, deleteProgram, updateProgram } from "@database/program";
import { ProgramInput } from "models/Program";
import { validateProgramData } from "@utils/validation/program";

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
    //TODO: Replace if statements with switch/case statements
    if (req.method == "GET") {
        // Obtain program id
        const { id } = req.query;

        // obtain program with provided programId
        const program = await getProgram(id as string);

        if (!program) {
            ResponseUtil.returnNotFound(
                res,
                `Program with id ${id} not found.`,
            );
            return;
        }
        ResponseUtil.returnOK(res, program);
        return;
    } else if (req.method == "DELETE") {
        // Obtain program id
        const { id } = req.query;
        // Delete program with provided programId
        const program = await deleteProgram(id as string);

        if (!program) {
            ResponseUtil.returnNotFound(
                res,
                `Program with id ${id} not found.`,
            );
            return;
        }
        ResponseUtil.returnOK(res, program);
        return;
    } else if (req.method == "PUT") {
        // validate new body
        const validationError = validateProgramData(req.body as ProgramInput);
        if (validationError.length !== 0) {
            ResponseUtil.returnBadRequest(res, validationError.join(", "));
            return;
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
            return;
        }
        ResponseUtil.returnOK(res, program);
        return;
    } else {
        const allowedHeaders: string[] = ["GET", "DELETE", "PUT"];
        ResponseUtil.returnMethodNotAllowed(
            res,
            allowedHeaders,
            `Method ${req.method} Not Allowed`,
        );
        return;
    }
}
