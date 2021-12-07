import prisma from "@database";
import { Class } from "@prisma/client";
import { ClassInput, ClassTranslationInput } from "@models/Class";
import { totalMinutes } from "@utils/time/convert";
import { weekdayToDay } from "@utils/enum/weekday";
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
 * @param  {boolean} isArchived filter option for archived classes
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getClasses(isArchived: boolean) {
    const classes = await prisma.class.findMany({
        where: {
            isArchived: isArchived,
        },
        include: {
            program: { include: { programTranslation: true } },
            classTranslation: true,
            teacherRegs: {
                include: {
                    teacher: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
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
 * getWeeklySortedClasses returns all the upcoming classes for a particular week
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getWeeklySortedClasses() {
    const classes = await prisma.class.findMany({
        where: {
            isArchived: false,
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

    // To manual sort due to sorting property of startDate
    classes.sort((x, y) => {
        if (x.weekday === y.weekday) {
            return totalMinutes(x.startDate) - totalMinutes(y.startDate);
        } else {
            return weekdayToDay(x.weekday) - weekdayToDay(y.weekday);
        }
    });
    return classes;
}

/**
 * getClassCount returns count of all classes
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getClassCount() {
    return await prisma.class.count({
        where: {
            isArchived: false,
        },
    });
}

/**
 * getClassRegistrants takes the classId parameter and returns the class registrants (students + volunteer)
 * @param {string} classId - classId
 *
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getClassRegistrants(classId: number) {
    const classSection = await prisma.class.findUnique({
        where: {
            id: classId,
        },
        select: {
            id: true,
            parentRegs: {
                include: {
                    student: true,
                },
            },
            volunteerRegs: {
                include: {
                    volunteer: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
        },
    });
    return classSection;
}

/**
 * createClass creates a new class record
 * @param input - data of type ClassInput
 * @returns Promise<Class> - Promise with the newly created class
 */
async function createClass(
    input: ClassInput,
    translations: ClassTranslationInput[],
): Promise<Class> {
    let newClass = null;

    //Doesn't exist (Create)
    if (input.id === -1) {
        delete input.id;
        newClass = await prisma.class.create({
            data: {
                ...input,
                classTranslation: {
                    createMany: {
                        data: translations,
                    },
                },
            },
        });
    }
    //Update
    else {
        await prisma.classTranslation.deleteMany({
            where: {
                classId: input.id,
            },
        });

        newClass = await prisma.class.update({
            where: {
                id: input.id,
            },
            data: {
                ...input,
                classTranslation: {
                    createMany: {
                        data: translations,
                    },
                },
            },
        });
    }
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
async function updateClass(id: number, updatedClassData: ClassInput): Promise<Class> {
    const updatedClass = await prisma.class.update({
        where: {
            id,
        },
        data: updatedClassData,
    });
    return updatedClass;
}

/**
 * updateArchiveClass takes in id of the class and boolean of whether to archive the class and performs update
 * @param  {number} id - classId of the class to be updated
 * @param  {boolean} isArchive whether or not to archive the class
 * @returns Promise<Class> - Promise with the updated class
 */
async function updateClassArchive(id: number, isArchive: boolean): Promise<Class> {
    const updatedClass = await prisma.class.update({
        where: {
            id,
        },
        data: {
            isArchived: isArchive,
            ...(() => {
                if (!isArchive) {
                    return {
                        program: {
                            update: {
                                isArchived: isArchive,
                            },
                        },
                    };
                }
            })(),
        },
    });
    return updatedClass;
}

export {
    getClass,
    getClasses,
    getWeeklySortedClasses,
    getClassRegistrants,
    getClassCount,
    createClass,
    deleteClass,
    updateClass,
    updateClassArchive,
};
