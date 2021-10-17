import { s3 } from "@aws";
import { ResponseUtil } from "@utils/responseUtil";
import { getSession } from "next-auth/client"; // Session handling
import { NextApiRequest, NextApiResponse } from "next";
import { roles } from ".prisma/client";
import {
    getUserFromEmail,
    updateParentProofOfIncomeLink,
    updateVolunteerCriminalCheckLink,
} from "@database/user";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const session = await getSession({ req });
    const fileSizeLimitBytes = 5000000; // up to ~5MB
    // If there is no session
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

    const { path, file } = req.query;

    if (!accepted_type_paths.includes(path as string)) {
        return ResponseUtil.returnNotFound(res, "Type not accepted");
    }

    switch (req.method) {
        case "GET": {
            const post = await s3.createPresignedPost({
                Bucket: process.env.S3_UPLOAD_BUCKET,
                Fields: {
                    key: `${path}/${file}`,
                },
                Conditions: [["content-length-range", 0, fileSizeLimitBytes]],
            });

            const user = await getUserFromEmail(session.user.email);

            if (!user) {
                return ResponseUtil.returnUnauthorized(res, "Unauthorized");
            }

            // Assume that the presigned url is used immediately and save the path to records
            // Depending on whether or not it's criminal check or poi, we do a vol or parent write
            if (
                user.role === roles.VOLUNTEER &&
                path === accepted_type_paths[1]
            ) {
                updateVolunteerCriminalCheckLink(
                    session.user.email,
                    `${path}/${file}`,
                );
            } else if (
                user.role === roles.PARENT &&
                path === accepted_type_paths[2]
            ) {
                updateParentProofOfIncomeLink(
                    session.user.email,
                    `${path}/${file}`,
                );
            }

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
