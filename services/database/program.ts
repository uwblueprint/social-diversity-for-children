import prisma from "@database";
import { Program } from "@prisma/client";
/**
 * NOTE: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
 * getProgram takes the id parameter and returns the program associated with the programId
 * @param {string} id - programId
 *
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

export { getProgram, getPrograms };
