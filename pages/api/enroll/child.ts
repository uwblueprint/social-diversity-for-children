import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { ResponseUtil } from "@utils/responseUtil";
import { getParentRegistration } from "@database/enroll";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    switch (req.method) {
        case "GET": {
            const router = useRouter();
            // obtain query parameters
            const { studentId, classId } = router.query;

            // verify that query parameters were passed in
            if (!studentId || !classId) {
                return ResponseUtil.returnBadRequest(
                    res,
                    "studentId and classId are required to obtain a program registration record",
                );
            }

            // parse query parameters from strings to numbers
            const studentIdNumber = parseInt(studentId as string, 10);
            const classIdNumber = parseInt(studentId as string, 10);

            // verify that the query parameters were successfully converted to numbers
            if (!studentId || !classId) {
                return ResponseUtil.returnBadRequest(
                    res,
                    "studentId and classId should be passed in as numbers",
                );
            }

            // obtain the parent registration record
            const parentRegistrationRecord = await getParentRegistration(
                studentIdNumber,
                classIdNumber,
            );

            // verify that the parent registration record could be obtained
            if (!parentRegistrationRecord) {
                return ResponseUtil.returnNotFound(
                    res,
                    "a registration entry was not found for the studentId and classId",
                );
            }

            // return response
            ResponseUtil.returnOK(res, parentRegistrationRecord);
            break;
        }
        case "POST": {
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
