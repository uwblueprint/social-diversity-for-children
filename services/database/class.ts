import prisma from "@database";
import { Class } from "@prisma/client";
import { ClassInput } from "@models/Class";
/**
 * getClass takes the id parameter and returns the class associated with the classId
 * @param {string} id - classId
 *
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getClass(id: number) {
    const classSection = await prisma.class.findUnique({
        where: {
            id,
        },
        include: {
            program: { include: { programTranslation: true } },
            classTranslation: true,
            teacherRegs: {
                include: { teacher: { include: { user: true } } },
            },
            _count: {
                select: {
                    parentRegs: true,
                    volunteerRegs: true,
                },
            },
        },
    });
    return classSection;
}

/**
 * getClasses returns all the classes with registration counts
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getClasses() {
    const classes = await prisma.class.findMany({
        include: {
            _count: {
                select: {
                    parentRegs: true,
                    volunteerRegs: true,
                },
            },
        },
    });
    return classes;
}

/**
 * createClass creates a new class record
 * @param input - data of type ClassInput
 * @returns Promise<Class> - Promise with the newly created class
 */
async function createClass(input: ClassInput): Promise<Class> {
    const newClass = await prisma.class.create({
        data: {
            name: input.name,
            borderAge: input.borderAge,
            isAgeMinimal: input.isAgeMinimal,
            programId: input.programId,
            spaceTotal: input.spaceTotal,
            stripePriceId: input.stripePriceId,
            volunteerSpaceTotal: input.volunteerSpaceTotal,
            startDate: input.startDate,
            endDate: input.endDate,
            weekday: input.weekday,
            startTimeMinutes: input.startTimeMinutes,
            durationMinutes: input.durationMinutes,
        },
    });
    return newClass;
}

/**
 * deleteClass takes in id of the class and returns the deleted class
 * @param id - classId of the class to be deleted
 * @returns Promise<Class> - Promise with the deleted class
 */
async function deleteClass(id: number): Promise<Class> {
    const deletedClass = await prisma.class.delete({
        where: {
            id,
        },
    });
    return deletedClass;
}

/**
 * updateClass takes in id of the class and updates the class information
 * @param id - classId of the class to be updated
 * @returns Promise<Class> - Promise with the updated class
 */
async function updateClass(
    id: number,
    updatedClassData: ClassInput,
): Promise<Class> {
    const updatedClass = await prisma.class.update({
        where: {
            id,
        },
        data: updatedClassData,
    });
    return updatedClass;
}

export { getClass, getClasses, createClass, deleteClass, updateClass };
