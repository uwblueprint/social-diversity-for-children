import prisma from "@database";

/**
 * NOTE: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
 * getProgram takes the id parameter and returns the program associated with the programId
 * @param {string} id - programId
 */

async function getProgram(id: string) {
    const program = await prisma.program.findUnique({
        where: {
            id: parseInt(id),
        },
        //get program() exposes CRUD operations for Program model
        //potentially include programs : true ?
        //include: {},
    });
    return program;
}

async function getPrograms() {
    const programs = await prisma.program.findMany({
        //include: {},
    });
    return programs;
}

/**
 * NOTE: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
 * getProgram takes the id parameter and returns the program associated with the programId
 * @param newProgramData - data corresponding to new program
 * @returns
 */

async function createProgram(newProgramData) {
    //TODO: validate the data
    try {
        const program = await prisma.program.create({
            data: newProgramData,
        });
        return program;
    } catch (e) {
        console.log(e);
    }
}

export { getProgram, getPrograms, createProgram };
