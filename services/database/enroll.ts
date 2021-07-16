import prisma from "@database";
import { ParentRegistrationInput } from "@models/ParentRegistration";
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

async function createParentRegistration(
    parentRegistrationData: ParentRegistrationInput,
): Promise<ParentReg> {
    const parentRegistration = await prisma.parentReg.create({
        data: {
            parentId: parentRegistrationData.parentId,
            studentId: parentRegistrationData.studentId,
            classId: parentRegistrationData.classId,
        },
    });

    return parentRegistration;
}

export { getParentRegistration, createParentRegistration };
