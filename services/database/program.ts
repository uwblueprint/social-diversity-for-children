import prisma from "@database";
import { createProgramInput } from "models/Program";
import { Program } from "@prisma/client";
/**
 * NOTE: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
 * getProgram takes the id parameter and returns the program associated with the programId
 * @param {string} id - programId
 */
async function getProgram(id: string): Promise<Program> {
    const program = await prisma.program.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    return program;
}

/**
 * getPrograms returns all the programs
 */
async function getPrograms(): Promise<Program[]> {
    const programs = await prisma.program.findMany({});
    return programs;
}

/**
 * NOTE: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
 * createProgram takes in newProgramData and returns the newly created program
 * @param newProgramData - data corresponding to new program
 * @returns Promise<Program> - Promise with the newly created program
 */
async function createProgram(
    newProgramData: createProgramInput,
): Promise<Program> {
    const program = await prisma.program.create({
        data: {
            price: newProgramData.price,
            online_format: newProgramData.onlineFormat,
            tag: newProgramData.tag,
            start_date: newProgramData.startDate,
            end_date: newProgramData.endDate,
            is_archived: newProgramData.isArchived,
        },
    });
    return program;
}

/**
 * deleteProgram takes in the id of the program and returns the deleted program
 * @param id - programId of the program to delete
 * @returns Promise<Program> - Promise with the deleted program
 */
async function deleteProgram(id: string): Promise<Program> {
    const program = await prisma.program.delete({
        where: {
            id: parseInt(id),
        },
    });
    return program;
}
export { getProgram, getPrograms, createProgram, deleteProgram };
