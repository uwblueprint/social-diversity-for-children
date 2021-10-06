import { s3 } from "@aws";
import { ResponseUtil } from "@utils/responseUtil";
import { getSession } from "next-auth/client"; // Session handling
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const session = await getSession({ req });

    // If there is no session or the user is not a parent
    if (!session) {
        return ResponseUtil.returnUnauthorized(res, "Unauthorized");
    }
    // TODO make this more robost/better
    const accepted_type_paths = [
        "other",
        "criminal-check",
        "income-proof",
        "curriculum-plans",
    ];
    if (!accepted_type_paths.includes(req.query.path as string)) {
        return ResponseUtil.returnNotFound(res, "Type not accepted");
    }

    switch (req.method) {
        case "GET": {
            const post = await s3.createPresignedPost({
                Bucket: process.env.S3_UPLOAD_BUCKET, // Some env var probably
                Fields: {
                    key: `${req.query.path}/${req.query.file}`,
                },
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
