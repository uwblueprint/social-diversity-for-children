import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getClassInfoWithProgramId } from "@database/programcardinfo";

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
        const { id } = req.query;
        const result = await getClassInfoWithProgramId(id as string);

        if (!result) {
            ResponseUtil.returnNotFound(
                res,
                `Class info not found for program ` + id,
            );
            return;
        }
        ResponseUtil.returnOK(res, result);
        return;
    } else {
        ResponseUtil.returnMethodNotAllowed(res, ["GET"]);
    }
}
