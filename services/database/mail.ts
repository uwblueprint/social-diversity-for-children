import prisma from "@database";

/**
 * Finds all associated parents and volunteers with a class with a restricted time range
 * @param hoursWithin time range requirement, i.e., query the database for classes starting in hoursWithin hours
 * @returns Promise<void> of a query described above
 */
export default async function findEmails(hoursWithin: number) {
    const oneHourAfter = new Date();
    const oneHourBefore = new Date();
    oneHourAfter.setHours(oneHourAfter.getHours() + (hoursWithin + 1));
    oneHourBefore.setHours(oneHourBefore.getHours() + (hoursWithin - 1));
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
                lte: oneHourAfter,
                gte: oneHourBefore,
            },
        },
    });
    return result;
}
