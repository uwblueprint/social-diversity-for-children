import prisma from "@database";
import { UserInput, ParentInput, VolunteerInput } from "@models/User";
import { User, roles } from "@prisma/client";

/**
 * NOTE: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
 * getUser takes the id parameter and returns the user associated with the userId
 * @param {string} id - userId
 */
async function getUser(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            teacher: true,
            parent: {
                include: {
                    students: true,
                },
            },
            programAdmin: true,
            volunteer: true,
        },
    });
    return user;
}

/**
 * getUsers returns all the users
 */
async function getUsers() {
    const users = await prisma.user.findMany({
        include: {
            teacher: true,
            parent: {
                include: {
                    students: true,
                },
            },
            programAdmin: true,
            volunteer: true,
        },
    });
    return users;
}

/**
 * Updates a user with the data corresponding to userInput
 * @param userInput - data for the updated user
 * @returns prisma User with updated information
 */
async function updateUser(userInput: UserInput): Promise<User> {
    /*
    Flow:
    - get role and role data from UserInput
    - create/update the role record
    - update the user record
    - return the user, including the role records
    */
    const roleData = userInput.roleData;
    const user = await getUser(userInput.id);

    const updateUserArgs = {
        data: {
            firstName: userInput.firstName,
            lastName: userInput.lastName,
            role: userInput.role,
        },
        where: { id: parseInt(userInput.id) },
        include: {
            teacher: true,
            parent: true,
            programAdmin: true,
            volunteer: true,
        },
    };

    let updatedUser: User;

    switch (userInput.role) {
        case roles.PARENT: {
            if (user.role && user.role !== roles.PARENT) {
                // TODO: add error message
                return;
            }
            const parentData = roleData as ParentInput;
            [, updatedUser] = await prisma.$transaction([
                prisma.parent.upsert({
                    create: {
                        phoneNumber: parentData.phoneNumber,
                        isLowIncome: parentData.isLowIncome,
                        preferredLanguage: parentData.preferredLanguage,
                        proofOfIncomeLink: parentData.proofOfIncomeLink,
                        heardFrom: parentData.heardFrom,
                        user: {
                            connect: { id: user.id },
                        },
                        students: {
                            create: {
                                firstName:
                                    parentData.createStudentInput.firstName,
                                lastName:
                                    parentData.createStudentInput.lastName,
                                dateOfBirth:
                                    parentData.createStudentInput.dateOfBirth,
                                addressLine1:
                                    parentData.createStudentInput.addressLine1,
                                addressLine2:
                                    parentData.createStudentInput.addressLine2,
                                postalCode:
                                    parentData.createStudentInput.postalCode,
                                cityName:
                                    parentData.createStudentInput.cityName,
                                province:
                                    parentData.createStudentInput.province,
                                school: parentData.createStudentInput.school,
                                grade: parentData.createStudentInput.grade,
                                difficulties:
                                    parentData.createStudentInput.difficulties,
                                otherDifficulties:
                                    parentData.createStudentInput
                                        .otherDifficulties,
                                specialEducation:
                                    parentData.createStudentInput
                                        .specialEducation,
                                therapy: parentData.createStudentInput.therapy,
                                otherTherapy:
                                    parentData.createStudentInput.otherTherapy,
                                guardianExpectations:
                                    parentData.createStudentInput
                                        .guardianExpectations,
                                medication:
                                    parentData.createStudentInput.medication,
                                allergies:
                                    parentData.createStudentInput.allergies,
                                additionalInfo:
                                    parentData.createStudentInput
                                        .additionalInfo,
                                emergFirstName:
                                    parentData.createStudentInput
                                        .emergFirstName,
                                emergLastName:
                                    parentData.createStudentInput.emergLastName,
                                emergNumber:
                                    parentData.createStudentInput.emergNumber,
                                emergRelationToStudent:
                                    parentData.createStudentInput
                                        .emergRelationToStudent,
                            },
                        },
                    },
                    update: {
                        phoneNumber: parentData.phoneNumber,
                        isLowIncome: parentData.isLowIncome,
                        proofOfIncomeLink: parentData.proofOfIncomeLink,
                        preferredLanguage: parentData.preferredLanguage,
                        heardFrom: parentData.heardFrom,
                        students: {
                            create: {
                                firstName:
                                    parentData.createStudentInput.firstName,
                                lastName:
                                    parentData.createStudentInput.lastName,
                                dateOfBirth:
                                    parentData.createStudentInput.dateOfBirth,
                                addressLine1:
                                    parentData.createStudentInput.addressLine1,
                                addressLine2:
                                    parentData.createStudentInput.addressLine2,
                                postalCode:
                                    parentData.createStudentInput.postalCode,
                                cityName:
                                    parentData.createStudentInput.cityName,
                                province:
                                    parentData.createStudentInput.province,
                                school: parentData.createStudentInput.school,
                                grade: parentData.createStudentInput.grade,
                                difficulties:
                                    parentData.createStudentInput.difficulties,
                                otherDifficulties:
                                    parentData.createStudentInput
                                        .otherDifficulties,
                                specialEducation:
                                    parentData.createStudentInput
                                        .specialEducation,
                                therapy: parentData.createStudentInput.therapy,
                                otherTherapy:
                                    parentData.createStudentInput.otherTherapy,
                                guardianExpectations:
                                    parentData.createStudentInput
                                        .guardianExpectations,
                                medication:
                                    parentData.createStudentInput.medication,
                                allergies:
                                    parentData.createStudentInput.allergies,
                                additionalInfo:
                                    parentData.createStudentInput
                                        .additionalInfo,
                                emergFirstName:
                                    parentData.createStudentInput
                                        .emergFirstName,
                                emergLastName:
                                    parentData.createStudentInput.emergLastName,
                                emergNumber:
                                    parentData.createStudentInput.emergNumber,
                                emergRelationToStudent:
                                    parentData.createStudentInput
                                        .emergRelationToStudent,
                            },
                        },
                    },
                    where: { id: user.id },
                }),
                prisma.user.update(updateUserArgs),
            ]);
            break;
        }
        case roles.PROGRAM_ADMIN: {
            if (user.role && user.role !== roles.PROGRAM_ADMIN) {
                // TODO: add error message
                return;
            }
            [, updatedUser] = await prisma.$transaction([
                prisma.programAdmin.upsert({
                    create: {
                        user: {
                            connect: { id: user.id },
                        },
                    },
                    update: {},
                    where: { id: user.id },
                }),
                prisma.user.update(updateUserArgs),
            ]);
            break;
        }
        case roles.VOLUNTEER: {
            if (user.role && user.role !== roles.VOLUNTEER) {
                // TODO: add error message
                return;
            }
            const volunteerData = roleData as VolunteerInput;
            [, updatedUser] = await prisma.$transaction([
                prisma.volunteer.upsert({
                    create: {
                        phoneNumber: volunteerData.phoneNumber,
                        isValid: volunteerData.isValid,
                        backgroundFormLink: volunteerData.backgroundFormLink,
                        addressLine1: volunteerData.addressLine1,
                        addressLine2: volunteerData.addressLine2,
                        postalCode: volunteerData.postalCode,
                        cityName: volunteerData.cityName,
                        province: volunteerData.province,
                        preferredLanguage: volunteerData.preferredLanguage,
                        user: {
                            connect: { id: user.id },
                        },
                    },
                    update: {
                        phoneNumber: volunteerData.phoneNumber,
                        isValid: volunteerData.isValid,
                        backgroundFormLink: volunteerData.backgroundFormLink,
                        addressLine1: volunteerData.addressLine1,
                        addressLine2: volunteerData.addressLine2,
                        postalCode: volunteerData.postalCode,
                        cityName: volunteerData.cityName,
                        province: volunteerData.province,
                        preferredLanguage: volunteerData.preferredLanguage,
                    },
                    where: { id: user.id },
                }),
                prisma.user.update(updateUserArgs),
            ]);
            break;
        }
        default: {
            return;
        }
    }

    return updatedUser;
}

export { getUser, getUsers, updateUser };
