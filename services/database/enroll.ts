import prisma from "@database";
import {
    ParentRegistrationInput,
    VolunteerRegistrationInput,
} from "@models/Enroll";
import { ParentReg, VolunteerReg } from "@prisma/client";

/**
 * getParentRegistration obtains the registration record of a parent enrollment
 *
 * @param {number} studentId  unique identifier of the enrolled child
 * @param {number} classId unique identifier of the class the child was enrolled in
 * @returns {Promise<ParentReg>} record of the registration
 */
async function getParentRegistration(
    parentId: number,
    studentId: number,
    classId: number,
): Promise<ParentReg> {
    const parentRegistrationRecord = await prisma.parentReg.findUnique({
        where: {
            parentId_studentId_classId: {
                parentId,
                studentId,
                classId,
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

/**
 * getVolunteerRegistration obtains the registration record of a volunteer enrollment
 *
 * @param {number} volunteerId  unique identifier of the enrolled volunteer
 * @param {number} classId unique identifier of the class the volunteer was enrolled in
 * @returns {Promise<VolunteerReg>} record of the registration
 */
async function getVolunteerRegistration(
    volunteerId: number,
    classId: number,
): Promise<VolunteerReg> {
    const volunteerRegistration = await prisma.volunteerReg.findUnique({
        where: {
            volunteerId_classId: {
                volunteerId,
                classId,
            },
        },
    });

    return volunteerRegistration;
}

/**
 * createVolunteerRegistration creates a new registration record of a volunteer enrollment
 *
 * @param {VolunteerRegistrationInput} volunteerRegistrationData the data containing the details of the enrollment
 * @returns {Promise<VolunteerReg>}
 */
async function createVolunteerRegistration(
    volunteerRegistrationData: VolunteerRegistrationInput,
): Promise<VolunteerReg> {
    const volunteerRegistration = await prisma.volunteerReg.create({
        data: {
            volunteerId: volunteerRegistrationData.volunteerId,
            classId: volunteerRegistrationData.classId,
        },
    });

    return volunteerRegistration;
}

export {
    getParentRegistration,
    createParentRegistration,
    getVolunteerRegistration,
    createVolunteerRegistration,
};
