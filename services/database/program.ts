import prisma from "@database";

/**
 * NOTE: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
 * getProgram takes the id parameter and returns the program associated with the programId
 * @param {string} id - programId
 */

async function getPrograms() {
    const user = await prisma.program.findMany({
        include: {},
    });
    return user;
}

export { getPrograms };
