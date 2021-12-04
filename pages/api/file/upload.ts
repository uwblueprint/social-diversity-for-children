import { ResponseUtil } from "@utils/responseUtil";
import { getSession } from "next-auth/client"; // Session handling
import { NextApiRequest, NextApiResponse } from "next";
import { roles } from ".prisma/client";
import {
    getUserFromEmail,
    updateParentProofOfIncomeLink,
    updateVolunteerCriminalCheckLink,
} from "@database/user";
import { getPresignedPostForUpload } from "@aws/s3";
import { v4 as uuidv4 } from "uuid";

export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req });
    // If there is no session
    if (!session) {
        return ResponseUtil.returnUnauthorized(res, "Unauthorized");
    }

    // TODO make this more robost/better
    const accepted_type_paths = [
        "criminal-check",
        "income-proof",
        "curriculum-plans",
        "cover-photo",
    ];

    const { path, file } = req.query;

    let bucket = "";
    let uploadFilePath = "";

    if (!accepted_type_paths.includes(path as string)) {
        return ResponseUtil.returnNotFound(res, "Type not accepted");
    }

    switch (req.method) {
        case "GET": {
            const user = await getUserFromEmail(session.user.email);

            if (!user) {
                return ResponseUtil.returnUnauthorized(res, "Unauthorized");
            }

            if (path === "cover-photo") {
                bucket = process.env.S3_PUBLIC_IMAGES_BUCKET;
                uploadFilePath = uuidv4();
            } else {
                bucket = process.env.S3_UPLOAD_BUCKET;
                uploadFilePath = `${path}/${user.email}/${file}`;
            }

            const post = getPresignedPostForUpload(bucket as string, uploadFilePath);
            if (!post) {
                return ResponseUtil.returnBadRequest(res, "Could not get link for upload");
            }

            // Assume that the presigned url is used immediately and save the path to records
            // Depending on whether or not it's criminal check or poi, we do a vol or parent write
            if (user.role === roles.VOLUNTEER && path === accepted_type_paths[0]) {
                await updateVolunteerCriminalCheckLink(session.user.email, file as string);
            } else if (user.role === roles.PARENT && path === accepted_type_paths[1]) {
                await updateParentProofOfIncomeLink(session.user.email, file as string);
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
