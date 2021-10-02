import { s3 } from "@aws";
import { ResponseUtil } from "@utils/responseUtil";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    switch (req.method) {
        case "GET": {
            const post = await s3.createPresignedPost({
                Bucket: "uw-bp-sdc-test-bucket-1", // Some env var probably
                Fields: {
                    key: req.query.file,
                },
                Expires: 60, // seconds
                Conditions: [
                    ["content-length-range", 0, 5000000], // up to ~5MB
                ],
            });

            ResponseUtil.returnOK(res, post);
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
