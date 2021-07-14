import prisma from "@database";
import { ParentReg } from "@prisma/client";

async function getParentRegistration(
    studentId: number,
    classId: number,
): Promise<ParentReg> {
    const parentRegistrationRecord = await prisma.parentReg.findUnique({
        where: {
            studentId_classId: {
                studentId: studentId,
                classId: classId,
            },
        },
    });

    return parentRegistrationRecord;
}

export { getParentRegistration };
