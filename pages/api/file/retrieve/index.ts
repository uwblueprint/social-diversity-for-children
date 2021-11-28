import { getSignedUrlForRetrieve } from "@aws/s3";
import { ResponseUtil } from "@utils/responseUtil";
import { getSession } from "next-auth/client"; // Session handling
import { NextApiRequest, NextApiResponse } from "next";
import { roles } from ".prisma/client";
import { getUserFromEmail } from "@database/user";
import { isAdmin } from "@utils/session/authorization";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    const session = await getSession({ req });
    // If there is no session
    if (!session) {
        return ResponseUtil.returnUnauthorized(res, "Unauthorized");
    }

    // TODO make this more robost/better
    const accepted_type_paths = ["criminal-check", "income-proof", "curriculum-plans"];

    // Attempt to retrieve file requested in user namespace if possible
    let { file, path } = req.query;
    const email = req.query.email;

    if (path && !accepted_type_paths.includes(path as string)) {
        return ResponseUtil.returnNotFound(res, "Type not accepted");
    }

    switch (req.method) {
        case "GET": {
            const user = await getUserFromEmail(session.user.email);

            if (!user) {
                return ResponseUtil.returnUnauthorized(res, "Unauthorized");
            }
            if (!path) {
                if (user.role === roles.VOLUNTEER) {
                    path = accepted_type_paths[0];
                } else if (user.role === roles.PARENT) {
                    path = accepted_type_paths[1];
                } else {
                    return ResponseUtil.returnBadRequest(
                        res,
                        "Path needs to be specified for this user",
                    );
                }
            }
            if (!file) {
                // Try to get file name in
                if (user.volunteer?.criminalRecordCheckLink) {
                    file = user.volunteer.criminalRecordCheckLink;
                } else if (user.parent?.proofOfIncomeLink) {
                    file = user.parent.proofOfIncomeLink;
                } else {
                    return ResponseUtil.returnNotFound(res, "File not found");
                }
            }

            if (email && email !== user.email) {
                if (!isAdmin(user)) {
                    return ResponseUtil.returnUnauthorized(res, "Unauthorized");
                }
            }

            const uploadFilePath = email
                ? `${path}/${email}/${file}`
                : `${path}/${user.email}/${file}`;

            const url = getSignedUrlForRetrieve(
                process.env.S3_UPLOAD_BUCKET,
                uploadFilePath,
            );

            ResponseUtil.returnOK(res, url);
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
