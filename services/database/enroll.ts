import prisma from "@database";
import { ParentRegistrationInput } from "models/ParentRegistration";
import { ParentReg } from "@prisma/client";

/**
 * getParentRegistration obtains the registration record of a parent enrollment
 *
 * @param {number} studentId  unique identifier of the enrolled child
 * @param {number} classId unique identifier of the class the child was enrolled in
 * @returns {Promise<ParentReg>} record of the registration
 */
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

/**
 * createParentRegistration creates a new registration record of a parent enrollment
 *
 * @param {ParentRegistrationInput} parentRegistrationData the data containing the details of the enrollment
 * @returns {Promise<ParentReg>}
 */
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
