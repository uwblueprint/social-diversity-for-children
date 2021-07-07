import prisma from "@database";
import { UserInput, ParentInput, VolunteerInput } from "@models/User";
import { User, roles } from "@prisma/client";
import { validateUser } from "@utils/validation/user";

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
            parent: true,
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
            parent: true,
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
    if (!validateUser(userInput)) {
        return null;
    }
    const roleData = userInput.roleData;
    if (!roleData.id) {
        roleData.id = userInput.id;
    }
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

    let updatedUser;

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
                        addressLine1: parentData.addressLine1,
                        addressLine2: parentData.addressLine2,
                        postalCode: parentData.postalCode,
                        cityName: parentData.cityName,
                        province: parentData.province,
                        preferredLanguage: parentData.preferredLanguage,
                        user: {
                            connect: { id: user.id },
                        },
                    },
                    update: {
                        phoneNumber: parentData.phoneNumber,
                        isLowIncome: parentData.isLowIncome,
                        addressLine1: parentData.addressLine1,
                        addressLine2: parentData.addressLine2,
                        postalCode: parentData.postalCode,
                        cityName: parentData.cityName,
                        province: parentData.province,
                        preferredLanguage: parentData.preferredLanguage,
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
