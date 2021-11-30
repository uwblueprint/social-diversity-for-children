import prisma from "@database";

/**
 * @param {string} id - programId
 * @param {boolean} isArchived - whether to search for archived classes
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getClassInfoWithProgramId(id: string, isArchived: boolean) {
    const findResults = await prisma.class.findMany({
        where: {
            programId: parseInt(id),
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
    return findResults;
}

/**
 * Get every program's card info
 * @param {boolean} isArchived - whether to search for archived programs
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getProgramCardInfos(isArchived: boolean) {
    const findResult = await prisma.program.findMany({
        where: {
            isArchived: isArchived,
        },
        include: {
            programTranslation: true,
        },
    });
    return findResult;
}

/**
 * Get the card info for one program with given id
 * @param {string} id - programId
 * @param {boolean} isArchived - whether to search for archived program
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getProgramCardInfo(id: string, isArchived: boolean) {
    const findResult = await prisma.program.findFirst({
        where: {
            id: parseInt(id),
            isArchived: isArchived,
        },
        include: {
            programTranslation: true,
        },
    });

    return findResult;
}
export { getProgramCardInfos, getProgramCardInfo, getClassInfoWithProgramId };
