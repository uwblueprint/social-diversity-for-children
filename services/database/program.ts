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
    });
    return program;
}

async function getPrograms() {
    const programs = await prisma.program.findMany({});
    return programs;
}

/**
 * NOTE: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
 * getProgram takes the id parameter and returns the program associated with the programId
 * @param newProgramData - data corresponding to new program
 * @returns
 */

async function createProgram(newProgramData: Program) {
    const program = await prisma.program.create({
        data: {
            price: newProgramData.price,
            start_date: newProgramData.start_date,
            end_date: newProgramData.end_date,
            weekday: newProgramData.weekday,
            start_time_minutes: newProgramData.start_time_minutes,
            duration_minutes: newProgramData.duration_minutes,
            space_total: newProgramData.space_total,
            space_available: newProgramData.space_available,
            volunteer_space_total: newProgramData.volunteer_space_available,
            volunteer_space_available: newProgramData.volunteer_space_available,
            is_archived: newProgramData.is_archived,
        },
    });
    return program;
}

export { getProgram, getPrograms, createProgram };
