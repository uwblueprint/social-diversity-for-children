import prisma from "@database";

/**
 * Finds all associated parents and volunteers with a class with a restricted time range
 * @param hoursWithin time range requirement, i.e., query the database for classes starting in hoursWithin hours
 * @returns Promise<void> of a query described above
 */
export default async function findEmails(hoursWithin: number) {
    const oneHourAfter = new Date();
    const hoursWithinAfter = new Date();
    oneHourAfter.setHours(oneHourAfter.getHours() + (hoursWithin + 1));
    hoursWithinAfter.setHours(hoursWithinAfter.getHours() + hoursWithin);
    const result = await prisma.class.findMany({
        include: {
            parentRegs: {
                include: {
                    parent: {
                        include: {
                            user: true,
                        },
                    },
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
        where: {
            startDate: {
                // restricting the startDate to be within hoursWithin +/- 1 hour from now
                lt: oneHourAfter,
                gte: hoursWithinAfter,
            },
        },
    });
    return result;
}
