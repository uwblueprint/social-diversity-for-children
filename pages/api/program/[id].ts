import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getProgram, deleteProgram } from "@database/program";

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
    if (req.method == "GET") {
        // Obtain program id
        const { id } = req.query;
        // Obtain program with provided programId
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
    } else {
        const allowedHeaders: string[] = ["GET", "DELETE"];
        ResponseUtil.returnMethodNotAllowed(
            res,
            allowedHeaders,
            `Method ${req.method} Not Allowed`,
        );
        return;
    }
}