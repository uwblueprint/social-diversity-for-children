import prisma from "@database";
import { ProgramInput, ProgramTranslationData } from "models/Program";
import { Program } from "@prisma/client";
import { locale } from "@prisma/client";

/**
 * getProgramCount returns count of all programs
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getProgramCount() {
    return await prisma.program.count();
}

/**
 * NOTE: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
 * createProgram takes in newProgramData and returns the newly created program
 * @param newProgramData - data corresponding to new program
 * @returns Promise<Program> - Promise with the newly created program
 */
async function createProgram(
    newProgramData: ProgramInput,
    newProgramTranslationsData: ProgramTranslationData[],
): Promise<Program> {
    let program = null;

    //Doesn't exist (Create)
    if (newProgramData.id === -1) {
        delete newProgramData.id;
        program = await prisma.program.create({
            data: {
                ...newProgramData,
                programTranslation: {
                    createMany: {
                        data: newProgramTranslationsData,
                    },
                },
            },
        });
    }
    //Update
    else {
        await prisma.programTranslation.deleteMany({
            where: {
                programId: newProgramData.id,
            },
        });

        program = await prisma.program.update({
            where: {
                id: newProgramData.id,
            },
            data: {
                ...newProgramData,
                programTranslation: {
                    createMany: {
                        data: newProgramTranslationsData,
                    },
                },
            },
        });
    }

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
/**
 * updateProgram takes in id and program input and updates said program
 * @param  {string} id program id
 * @param  {ProgramInput} updatedProgramData update input
 * @returns Promise<Program>
 */
async function updateProgram(id: string, updatedProgramData: ProgramInput): Promise<Program> {
    const program = await prisma.program.update({
        where: {
            id: parseInt(id),
        },
        data: updatedProgramData,
    });
    return program;
}

/**
 * updateArchiveProgram takes in id of the program and boolean of whether to archive the program and performs update
 * @param  {number} id program id to be updated
 * @param  {boolean} isArchive whether or not to archive the class
 * @returns Promise<Program> Promise with the updated program
 */
async function updateProgramArchive(id: number, isArchive: boolean): Promise<Program> {
    const updatedProgram = await prisma.program.update({
        where: {
            id,
        },
        data: {
            isArchived: isArchive,
            classes: {
                updateMany: {
                    data: {
                        isArchived: isArchive,
                    },
                    where: {
                        isArchived: !isArchive,
                    },
                },
            },
        },
    });
    return updatedProgram;
}

export { getProgramCount, createProgram, deleteProgram, updateProgram, updateProgramArchive };
