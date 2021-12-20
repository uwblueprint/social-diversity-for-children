import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client"; // Session handling
import { ResponseUtil } from "@utils/responseUtil";
import {
    getWaitlistRecord,
    getWaitlistRecordsByClassId,
    getWaitlistRecordsByParentId,
    createWaitlistRecord,
    deleteWaitlistRecord,
} from "@database/waitlist";
import { validateWaitlistRecord } from "@utils/validation/waitlist";

/**
 * handle controls the request made to the waitlist resource
 * @param req API request object
 * @param res API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req });

    const parentId = session.id;
    if (!parentId) {
        return ResponseUtil.returnBadRequest(res, "No user id stored in session");
    }
    const { classId } = req.body;

    switch (req.method) {
        // Retrieving a waitlist by passing in the classId and parentId.
        case "GET": {
            if (classId && parentId) {
                // If both classId and parentId are passed in, retrieve the specific waitlist record
                const waitlistRecord = await getWaitlistRecord(classId, parentId);
                ResponseUtil.returnOK(res, waitlistRecord);
            } else if (classId) {
                // If only classId was passed in, retrieve all waitlist records for the class
                const waitlistRecordsForClass = await getWaitlistRecordsByClassId(classId);
                ResponseUtil.returnOK(res, waitlistRecordsForClass);
            } else if (parentId) {
                // If only the parentId was passed in, retrieve all waitlist records for the parent
                const waitlistRecordsForParent = await getWaitlistRecordsByParentId(parentId);
                ResponseUtil.returnOK(res, waitlistRecordsForParent);
            } else {
                // If neither the classId or the parentId are passed in
                ResponseUtil.returnBadRequest(
                    res,
                    `Required input for retrieving a waitlist record was not provided`,
                );
            }
            break;
        }
        case "POST": {
            const validationErrors = validateWaitlistRecord(classId, parentId);
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
                return;
            }
            const newWaitlistRecord = await createWaitlistRecord(classId, parentId);
            if (!newWaitlistRecord) {
                ResponseUtil.returnBadRequest(res, `Waitlist record could not be created`);
                return;
            }
            ResponseUtil.returnOK(res, newWaitlistRecord);
            break;
        }
        case "DELETE": {
            const validationErrors = validateWaitlistRecord(classId, parentId);
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
                return;
            }
            const deletedWaitlistRecord = await deleteWaitlistRecord(classId, parentId);
            if (!deletedWaitlistRecord) {
                ResponseUtil.returnNotFound(
                    res,
                    `Waitlist record with parentId:${parentId}, classId:${classId} not found.`,
                );
                return;
            }
            ResponseUtil.returnOK(res, deleteWaitlistRecord);
            break;
        }
        default: {
            const allowedHeaders: string[] = ["GET", "POST", "DELETE"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
    return;
}
