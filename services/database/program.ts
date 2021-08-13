import prisma from "@database";
import { ProgramInput } from "models/Program";
import { Program } from "@prisma/client";

/**
 * NOTE: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
 * createProgram takes in newProgramData and returns the newly created program
 * @param newProgramData - data corresponding to new program
 * @returns Promise<Program> - Promise with the newly created program
 */
async function createProgram(newProgramData: ProgramInput): Promise<Program> {
    const program = await prisma.program.create({
        data: {
            price: newProgramData.price,
            onlineFormat: newProgramData.onlineFormat,
            tag: newProgramData.tag,
            startDate: newProgramData.startDate,
            endDate: newProgramData.endDate,
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

async function updateProgram(
    id: string,
    updatedProgramData: ProgramInput,
): Promise<Program> {
    const program = await prisma.program.update({
        where: {
            id: parseInt(id),
        },
        data: updatedProgramData,
    });
    return program;
}

export { createProgram, deleteProgram, updateProgram };
