import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import {
    getWaitlistRecord,
    getWaitlistRecordsByClassId,
    getWaitlistRecordsByParentId,
    createWaitlistRecord,
    deleteWaitlistRecord,
} from "@database/waitlist";
import { WaitlistInput } from "models/Waitlist";
import { validateWaitlistRecord } from "@utils/validation/waitlist";

/**
 * handle controls the request made to the waitlist resource
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    switch (req.method) {
        // Retrieving a waitlist by passing in the classId and parentId.
        case "GET": {
            const input = req.body as WaitlistInput;

            if (input.classId && input.parentId) {
                // If both classId and parentId are passed in, retrieve the specific waitlist record
                const waitlistRecord = await getWaitlistRecord(input);
                ResponseUtil.returnOK(res, waitlistRecord);
            } else if (input.classId) {
                // If only classId was passed in, retrieve all waitlist records for the class
                const waitlistRecordsForClass =
                    await getWaitlistRecordsByClassId(input.classId);
                ResponseUtil.returnOK(res, waitlistRecordsForClass);
            } else if (input.parentId) {
                // If only the parentId was passed in, retrieve all waitlist records for the parent
                const waitlistRecordsForParent =
                    await getWaitlistRecordsByParentId(input.parentId);
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
            const input = req.body as WaitlistInput;
            const validationErrors = validateWaitlistRecord(input);
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
                return;
            }
            const newWaitlistRecord = await createWaitlistRecord(input);
            if (!newWaitlistRecord) {
                ResponseUtil.returnBadRequest(
                    res,
                    `Waitlist record could not be created`,
                );
                return;
            }
            ResponseUtil.returnOK(res, newWaitlistRecord);
            break;
        }
        case "DELETE": {
            const input = req.body as WaitlistInput;
            const validationErrors = validateWaitlistRecord(input);
            if (validationErrors.length !== 0) {
                ResponseUtil.returnBadRequest(res, validationErrors.join(", "));
                return;
            }
            const deletedWaitlistRecord = await deleteWaitlistRecord(input);
            if (!deletedWaitlistRecord) {
                ResponseUtil.returnNotFound(
                    res,
                    `Waitlist record with parentId:${input.parentId}, classId:${input.classId} not found.`,
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
