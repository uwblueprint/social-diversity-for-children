import prisma from "@database";
import { UserInput, ParentInput, VolunteerInput } from "@models/User";
import { User, roles } from "@prisma/client";

/**
 * NOTE: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
 * getUser takes the id parameter and returns the user associated with the userId
 * @param {string} id - userId
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
 * getUser takes the email parameter and returns a minimal user associated with the email
 * @param {string} email
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getUserFromEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
 * getRegistrantCount returns count of all parents + volunteers
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getRegistrantCount() {
    const count = await prisma.user.count({
        where: {
            OR: [{ role: "PARENT" }, { role: "VOLUNTEER" }],
        },
    });
    return count;
}

/**
 * getTeacherCount returns count of all teachers
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getTeacherCount() {
    const count = await prisma.user.count({
        where: {
            role: "TEACHER",
        },
    });
    return count;
}

/**
 * Updates a user with the data corresponding to userInput
 * @param userInput - data for the updated user
 * @returns prisma User with updated information
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function updateUser(userInput: UserInput) {
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
                parentData.createStudentInput
                    ? prisma.parent.upsert({
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
                                          parentData.createStudentInput
                                              .firstName,
                                      lastName:
                                          parentData.createStudentInput
                                              .lastName,
                                      dateOfBirth:
                                          parentData.createStudentInput
                                              .dateOfBirth,
                                      addressLine1:
                                          parentData.createStudentInput
                                              .addressLine1,
                                      addressLine2:
                                          parentData.createStudentInput
                                              .addressLine2,
                                      postalCode:
                                          parentData.createStudentInput
                                              .postalCode,
                                      cityName:
                                          parentData.createStudentInput
                                              .cityName,
                                      province:
                                          parentData.createStudentInput
                                              .province,
                                      school: parentData.createStudentInput
                                          .school,
                                      grade: parentData.createStudentInput
                                          .grade,
                                      difficulties:
                                          parentData.createStudentInput
                                              .difficulties,
                                      otherDifficulties:
                                          parentData.createStudentInput
                                              .otherDifficulties,
                                      specialEducation:
                                          parentData.createStudentInput
                                              .specialEducation,
                                      therapy:
                                          parentData.createStudentInput.therapy,
                                      otherTherapy:
                                          parentData.createStudentInput
                                              .otherTherapy,
                                      guardianExpectations:
                                          parentData.createStudentInput
                                              .guardianExpectations,
                                      medication:
                                          parentData.createStudentInput
                                              .medication,
                                      allergies:
                                          parentData.createStudentInput
                                              .allergies,
                                      additionalInfo:
                                          parentData.createStudentInput
                                              .additionalInfo,
                                      emergFirstName:
                                          parentData.createStudentInput
                                              .emergFirstName,
                                      emergLastName:
                                          parentData.createStudentInput
                                              .emergLastName,
                                      emergNumber:
                                          parentData.createStudentInput
                                              .emergNumber,
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
                                          parentData.createStudentInput
                                              .firstName,
                                      lastName:
                                          parentData.createStudentInput
                                              .lastName,
                                      dateOfBirth:
                                          parentData.createStudentInput
                                              .dateOfBirth,
                                      addressLine1:
                                          parentData.createStudentInput
                                              .addressLine1,
                                      addressLine2:
                                          parentData.createStudentInput
                                              .addressLine2,
                                      postalCode:
                                          parentData.createStudentInput
                                              .postalCode,
                                      cityName:
                                          parentData.createStudentInput
                                              .cityName,
                                      province:
                                          parentData.createStudentInput
                                              .province,
                                      school: parentData.createStudentInput
                                          .school,
                                      grade: parentData.createStudentInput
                                          .grade,
                                      difficulties:
                                          parentData.createStudentInput
                                              .difficulties,
                                      otherDifficulties:
                                          parentData.createStudentInput
                                              .otherDifficulties,
                                      specialEducation:
                                          parentData.createStudentInput
                                              .specialEducation,
                                      therapy:
                                          parentData.createStudentInput.therapy,
                                      otherTherapy:
                                          parentData.createStudentInput
                                              .otherTherapy,
                                      guardianExpectations:
                                          parentData.createStudentInput
                                              .guardianExpectations,
                                      medication:
                                          parentData.createStudentInput
                                              .medication,
                                      allergies:
                                          parentData.createStudentInput
                                              .allergies,
                                      additionalInfo:
                                          parentData.createStudentInput
                                              .additionalInfo,
                                      emergFirstName:
                                          parentData.createStudentInput
                                              .emergFirstName,
                                      emergLastName:
                                          parentData.createStudentInput
                                              .emergLastName,
                                      emergNumber:
                                          parentData.createStudentInput
                                              .emergNumber,
                                      emergRelationToStudent:
                                          parentData.createStudentInput
                                              .emergRelationToStudent,
                                  },
                              },
                          },
                          where: { id: user.id },
                      })
                    : prisma.parent.upsert({
                          create: {
                              phoneNumber: parentData.phoneNumber,
                              isLowIncome: parentData.isLowIncome,
                              preferredLanguage: parentData.preferredLanguage,
                              proofOfIncomeLink: parentData.proofOfIncomeLink,
                              heardFrom: parentData.heardFrom,
                              user: {
                                  connect: { id: user.id },
                              },
                          },
                          update: {
                              phoneNumber: parentData.phoneNumber,
                              isLowIncome: parentData.isLowIncome,
                              proofOfIncomeLink: parentData.proofOfIncomeLink,
                              preferredLanguage: parentData.preferredLanguage,
                              heardFrom: parentData.heardFrom,
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
                        dateOfBirth: volunteerData.dateOfBirth,
                        criminalRecordCheckLink:
                            volunteerData.criminalRecordCheckLink,
                        addressLine1: volunteerData.addressLine1,
                        postalCode: volunteerData.postalCode,
                        cityName: volunteerData.cityName,
                        province: volunteerData.province,
                        preferredLanguage: volunteerData.preferredLanguage,
                        skills: volunteerData.skills,
                        school: volunteerData.school,
                        hearAboutUs: volunteerData.hearAboutUs,
                        user: {
                            connect: { id: user.id },
                        },
                    },
                    update: {
                        phoneNumber: volunteerData.phoneNumber,
                        dateOfBirth: volunteerData.dateOfBirth,
                        criminalRecordCheckLink:
                            volunteerData.criminalRecordCheckLink,
                        addressLine1: volunteerData.addressLine1,
                        postalCode: volunteerData.postalCode,
                        cityName: volunteerData.cityName,
                        province: volunteerData.province,
                        preferredLanguage: volunteerData.preferredLanguage,
                        skills: volunteerData.skills,
                        school: volunteerData.school,
                        hearAboutUs: volunteerData.hearAboutUs,
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

/**
 * update volunteer's criminal check link in db to keep track of latest upload
 * @param  {string} email email of volunteer
 * @param  {string} link criminal check link name
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function updateVolunteerCriminalCheckLink(email: string, link: string) {
    const user = prisma.user.update({
        data: {
            volunteer: {
                update: {
                    criminalRecordCheckLink: link,
                },
            },
        },
        where: { email },
        include: {
            volunteer: true,
        },
    });

    return user;
}

/**
 * update volunteer's criminal check approval in db when admin changes it
 * @param  {string} email email of volunteer
 * @param  {boolean} approval criminal check approval status
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function updateVolunteerCriminalCheckApproval(
    email: string,
    approval: boolean,
) {
    const user = prisma.user.update({
        data: {
            volunteer: {
                update: {
                    criminalCheckApproved: approval,
                },
            },
        },
        where: { email },
        include: {
            volunteer: true,
        },
    });

    return user;
}

/**
 * update parent's proof of income link in db to keep track of latest upload
 * @param  {string} email email of parent
 * @param  {string} link proof of income link name
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function updateParentProofOfIncomeLink(email: string, link: string) {
    const user = prisma.user.update({
        data: {
            parent: {
                update: {
                    proofOfIncomeLink: link,
                },
            },
        },
        where: { email },
        include: {
            volunteer: true,
        },
    });

    return user;
}

export {
    getUser,
    getUserFromEmail,
    getUsers,
    getRegistrantCount,
    getTeacherCount,
    updateUser,
    updateVolunteerCriminalCheckLink,
    updateVolunteerCriminalCheckApproval,
    updateParentProofOfIncomeLink,
};
