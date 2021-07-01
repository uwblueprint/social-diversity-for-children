import prisma from "@database";
import { Class } from "@prisma/client";
import { createClassInput } from "models/Class";
/**
 * getClass takes the id parameter and returns the class associated with the classId
 * @param {string} id - classId
 *
 */
async function getClass(id: string): Promise<Class> {
    const classSection = await prisma.class.findUnique({
        where: {
            id: parseInt(id),
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
 * @param input - data of type createClassInput
 * @returns Promise<Class> - Promise with the newly created class
 */
async function createClass(input: createClassInput): Promise<Class> {
    console.log(input);
    const newClass = await prisma.class.create({
        data: {
            name: input.name,
            age_group: input.ageGroup,
            program_id: input.programId,
            space_total: input.spaceTotal,
            space_available: input.spaceTotal,
            volunteer_space_total: input.volunteerSpaceTotal,
            volunteer_space_available: input.volunteerSpaceTotal,
            start_date: input.startDate,
            end_date: input.endDate,
            weekday: input.weekday,
            start_time_minutes: input.startTimeMinutes,
            duration_minutes: input.durationMinutes,
        },
    });
    return newClass;
}

/**
 * deleteClass takes in id of the class and returns the deleted class
 * @param id - classId of the class to be deleted
 * @returns Promise<Class> - Promise with the deleted class
 */
async function deleteClass(id: string): Promise<Class> {
    const deletedClass = await prisma.class.delete({
        where: {
            id: parseInt(id),
        },
    });
    return deletedClass;
}

export { getClass, getClasses, createClass, deleteClass };
