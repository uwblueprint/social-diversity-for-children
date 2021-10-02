import prisma from "@database";
import {
    ParentRegistrationInput,
    VolunteerRegistrationInput,
} from "@models/Enroll";
import { locale, ParentReg, VolunteerReg } from "@prisma/client";

/**
 * getParentRegistrations obtains the registration records of a parent
 *
 * @returns {Promise<ParentReg[]>} record of the registration
 */
async function getParentRegistrations(
    parentId: number,
    language: locale,
): Promise<ParentReg[]> {
    const parentRegistrationRecords = await prisma.parentReg.findMany({
        where: {
            parentId,
        },
        include: {
            student: true,
            class: {
                include: {
                    classTranslation: {
                        where: {
                            language: language,
                        },
                    },
                    teacherRegs: {
                        include: {
                            teacher: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                    },
                    program: {
                        include: {
                            programTranslation: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            studentId: "asc",
        },
    });

    return parentRegistrationRecords;
}

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
 * deleteParentRegistration deletes an existing registration record of a parent enrollment
 *
 * @param {ParentRegistrationInput} parentRegistrationData the data containing the details of the enrollment
 * @returns {Promise<ParentReg>} the deleted parent registration
 */
async function deleteParentRegistration(
    parentRegistrationData: ParentRegistrationInput,
): Promise<ParentReg> {
    const parentRegistration = await prisma.parentReg.delete({
        where: {
            parentId_studentId_classId: {
                parentId: parentRegistrationData.parentId,
                studentId: parentRegistrationData.studentId,
                classId: parentRegistrationData.classId,
            },
        },
    });

    return parentRegistration;
}

/**
 * getVolunteerRegistrations obtains the class registrations of a volunteer
 *
 * @param {number} volunteerId  unique identifier of the enrolled volunteer
 * @returns {Promise<VolunteerReg>[]} records of the registration
 */
async function getVolunteerRegistrations(
    volunteerId: number,
    language: locale,
): Promise<VolunteerReg[]> {
    const volunteerRegistrations = await prisma.volunteerReg.findMany({
        where: {
            volunteerId,
        },
        include: {
            volunteer: {
                include: {
                    user: true,
                },
            },
            class: {
                include: {
                    classTranslation: {
                        where: {
                            language: language,
                        },
                    },
                    teacherRegs: {
                        include: {
                            teacher: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                    },
                    program: {
                        include: {
                            programTranslation: true,
                        },
                    },
                },
            },
        },
    });

    return volunteerRegistrations;
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

/**
 * deleteVolunteerRegistration deletes an existing registration record of a volunteer enrollment
 *
 * @param {VolunteerRegistrationInput} volunteerRegistrationData the data containing the details of the enrollment
 * @returns {Promise<VolunteerReg>} the deleted volunteer registration
 */
async function deleteVolunteerRegistration(
    volunteerRegistrationData: VolunteerRegistrationInput,
): Promise<VolunteerReg> {
    const volunteerRegistration = await prisma.volunteerReg.delete({
        where: {
            volunteerId_classId: {
                volunteerId: volunteerRegistrationData.volunteerId,
                classId: volunteerRegistrationData.classId,
            },
        },
    });

    return volunteerRegistration;
}

export {
    getParentRegistration,
    getParentRegistrations,
    createParentRegistration,
    deleteParentRegistration,
    getVolunteerRegistration,
    getVolunteerRegistrations,
    createVolunteerRegistration,
    deleteVolunteerRegistration,
};
