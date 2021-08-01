import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
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
    if (req.method == "GET") {
        const { id } = req.query;
        const result = id
            ? await getProgramCardInfo(id as string)
            : await getProgramCardInfos();

        if (!result) {
            ResponseUtil.returnNotFound(res, `Program info not found.`);
            return;
        }
        ResponseUtil.returnOK(res, result);
        return;
    } else {
        ResponseUtil.returnMethodNotAllowed(res, ["GET"]);
    }
}
