import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import getParams from "services/aws/ssm";

/**
 * handle controls the request made to the class resource
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const zoomLinkParamsStoreKeyName = "zoom-class-link";

    switch (req.method) {
        case "GET": {
            const zoomLink = await getParams(zoomLinkParamsStoreKeyName);
            ResponseUtil.returnOK(res, zoomLink);
            break;
        }
        default: {
            const allowedHeaders: string[] = ["GET"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
}
