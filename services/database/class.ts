import prisma from "@database";
import { Class } from "@prisma/client";
import { ClassInput } from "@models/Class";
/**
 * getClass takes the id parameter and returns the class associated with the classId
 * @param {string} id - classId
 *
 */
async function getClass(id: number): Promise<Class> {
    const classSection = await prisma.class.findUnique({
        where: {
            id: id,
        },
    });
    return classSection;
}

/**
 * getClasses returns all the classes
 */
async function getClasses(): Promise<Class[]> {
    const classes = await prisma.class.findMany();
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
            ageGroup: input.ageGroup,
            programId: input.programId,
            spaceTotal: input.spaceTotal,
            spaceAvailable: input.spaceTotal,
            volunteerSpaceTotal: input.volunteerSpaceTotal,
            volunteerSpaceAvailable: input.volunteerSpaceTotal,
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
            id: id,
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
            id: id,
        },
        data: updatedClassData,
    });
    return updatedClass;
}

export { getClass, getClasses, createClass, deleteClass, updateClass };
