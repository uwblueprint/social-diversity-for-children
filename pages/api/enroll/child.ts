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
            const { studentId, classId } = router.query;
            if (!studentId || !classId) {
                return ResponseUtil.returnBadRequest(
                    res,
                    "studentId and classId are required to obtain a program registration record",
                );
            }

            const studentIdNumber = parseInt(studentId as string, 10);
            const classIdNumber = parseInt(studentId as string, 10);
            if (!studentId || !classId) {
                return ResponseUtil.returnBadRequest(
                    res,
                    "studentId and classId should be passed in as numbers",
                );
            }

            const parentRegistrationRecord = await getParentRegistration(
                studentIdNumber,
                classIdNumber,
            );

            if (!parentRegistrationRecord) {
                return ResponseUtil.returnNotFound(
                    res,
                    "a registration entry was not found for the studentId and classId",
                );
            }

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
