import prisma from "@database";

export default async function findEmails(hoursWithin: number) {
    const dateNowPlusOne = new Date();
    const dateNowMinusOne = new Date();
    dateNowPlusOne.setHours(dateNowPlusOne.getHours() + (hoursWithin + 1));
    dateNowMinusOne.setHours(dateNowMinusOne.getHours() + (hoursWithin - 1));
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
                lte: dateNowPlusOne,
                gte: dateNowMinusOne,
            },
        },
    });
    return result;
}
