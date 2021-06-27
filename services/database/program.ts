import prisma from "@database";
import { Program } from "models/Program";

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

async function createProgram(newProgramData: Program) {
    //TODO: validate the data
    // start date before end date
    // non negative prices, etc.
    //space total = space avaiable during creation
    //volunteer total = volunteer avaiable during creation
    //validation helper functions in utils, import
    const program = await prisma.program.create({
        data: {
            price: newProgramData.price,
        },
    });
    return program;
}

export { getProgram, getPrograms, createProgram };
