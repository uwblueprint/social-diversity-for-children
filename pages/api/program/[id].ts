import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getProgram } from "@database/program";
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
        // Obtain user id
        const { id } = req.query;

        // obtain user with provided userId
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
    } else {
        const allowedHeaders: string[] = ["GET"];
        ResponseUtil.returnMethodNotAllowed(
            res,
            allowedHeaders,
            `Method ${req.method} Not Allowed`,
        );
        return;
    }
}
