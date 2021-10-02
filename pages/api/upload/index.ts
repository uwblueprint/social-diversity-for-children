import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client"; // Session handling
import { ResponseUtil } from "@utils/responseUtil";
import { UserInput } from "@models/User";
// import s3 from "@aws/s3";

/**
 * handle controls the request made to the enroll/child resource.
 * This endpoint is used when a parent is enrolling their child into a program
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const session = await getSession({ req });

    // If there is no session or the user is not a parent
    if (!session) {
        return ResponseUtil.returnUnauthorized(res, "Unauthorized");
    }
    switch (req.method) {
        case "GET": {
            // return response
            ResponseUtil.returnOK(res, "good");
            break;
        }
        case "POST": {
            const userId = session.id as string;
            const formData = req.body as FormData;
            for (const key in formData) {
                console.log(key, formData[key]);
            }
            ResponseUtil.returnOK(res, req.body);
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
}
