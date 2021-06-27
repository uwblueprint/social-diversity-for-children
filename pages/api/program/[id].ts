import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getProgram, createProgram } from "@database/program";
// TODO: Type the response data
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
    } else if (req.method == "POST") {
        const newProgramData = req.query;
        const newProgram = createProgram(newProgramData);

        if (!newProgram) {
            ResponseUtil.returnBadRequest(res, `Program could not be created`);
            return;
        }
        ResponseUtil.returnOK(res, newProgram);
        return;
    } else {
        const allowedHeaders: string[] = ["GET", "POST"];
        ResponseUtil.returnMethodNotAllowed(
            res,
            allowedHeaders,
            `Method ${req.method} Not Allowed`,
        );
        return;
    }
}
