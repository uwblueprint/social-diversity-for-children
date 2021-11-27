import prisma from "@database";
import { Waitlist } from "@prisma/client";
import { WaitlistInput } from "models/Waitlist";
/**
 * getWaitlistRecord takes the classId and parentId and returns the associated waitlist
 * @param classId
 * @param parentId
 */
async function getWaitlistRecord(input: WaitlistInput): Promise<Waitlist> {
    const waitlistRecord = await prisma.waitlist.findUnique({
        where: {
            parentId_classId: {
                classId: input.classId,
                parentId: input.parentId,
            },
        },
    });
    return waitlistRecord;
}

/**
 * getWaitlistRecordsByClassId returns a list of waitlists associated with the classId
 * @param classId
 * @returns Promise<Waitlist[]> - Promise with list of waitlist records associated with the class
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getWaitlistRecordsByClassId(classId: number) {
    const waitlistRecords = await prisma.waitlist.findMany({
        where: {
            classId: classId,
        },
        include: {
            parent: {
                include: {
                    user: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc", // ascending order as the oldest createdAt date is the highest priority.
        },
    });
    return waitlistRecords;
}

/**
 * getWaitlistRecordsByParentId returns a list of waitlist records associated with the parentId
 * @param parentId
 * @returns Promise<Waitlist[]> - Promise with list of waitlist records associated with the parent
 */
async function getWaitlistRecordsByParentId(parentId: number): Promise<Waitlist[]> {
    const waitlistRecords = await prisma.waitlist.findMany({
        where: {
            parentId: parentId,
        },
        include: {
            parent: true,
            class: {
                include: {
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
                    program: {
                        include: {
                            programTranslation: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    return waitlistRecords;
}

/**
 * createWaitlistRecord creates a new waitlist record
 * @param input - data of type WaitlistInput
 * @returns Promise<Waitlist> - Promise with the newly created waitlist record
 */
async function createWaitlistRecord(input: WaitlistInput): Promise<Waitlist> {
    const waitlistRecord = await prisma.waitlist.create({
        data: {
            classId: input.classId,
            parentId: input.parentId,
        },
    });
    return waitlistRecord;
}

/**
 * deleteWaitlistRecord deletes a waitlist record
 * @param input - data of type WaitlistInput
 * @returns Promise<Class> - Promise with the deleted class
 */
async function deleteWaitlistRecord(input: WaitlistInput): Promise<Waitlist> {
    const deletedWaitlistRecord = await prisma.waitlist.delete({
        where: {
            parentId_classId: {
                classId: input.classId,
                parentId: input.parentId,
            },
        },
    });
    return deletedWaitlistRecord;
}

export {
    getWaitlistRecord,
    getWaitlistRecordsByClassId,
    getWaitlistRecordsByParentId,
    createWaitlistRecord,
    deleteWaitlistRecord,
};
