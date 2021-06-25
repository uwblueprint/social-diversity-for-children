import prisma from "@database";

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
            teachers: true,
            parents: true,
            program_admins: true,
            volunteers: true,
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
            teachers: true,
            parents: true,
            program_admins: true,
            volunteers: true,
        },
    });
    return users;
}

/**
 * Creates a new user corresponding to newUserData and returns the newly created user
 * @param newUserData - data corresponding to the new user
 * @returns - the newly created user
 */
async function createUser(newUserData) {
    const user = await prisma.user.create({
        // TODO: are created_at and updated_at passed in or auto generated?
        data: newUserData,
    });
    return user;
}

export { getUser, getUsers, createUser };
