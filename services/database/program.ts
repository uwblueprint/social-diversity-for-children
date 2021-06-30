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
 * getProgram takes the id parameter and returns the program associated with the programId
 * @param newProgramData - data corresponding to new program
 * @returns
 */
async function createProgram(
    newProgramData: createProgramInput,
): Promise<Program> {
    const program = await prisma.program.create({
        data: {
            price: newProgramData.price,
            start_date: newProgramData.startDate,
            end_date: newProgramData.endDate,
            weekday: newProgramData.weekday,
            start_time_minutes: newProgramData.startTimeMinutes,
            duration_minutes: newProgramData.durationMinutes,
            space_total: newProgramData.spaceTotal,
            space_available: newProgramData.spaceAvailable,
            volunteer_space_total: newProgramData.volunteerSpaceAvailable,
            volunteer_space_available: newProgramData.volunteerSpaceAvailable,
            is_archived: newProgramData.isArchived,
        },
    });
    return program;
}

/**
 * deleteProgram takes the id parameter and deletes the program associated with the programId
 * @param {string} id - programId
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
