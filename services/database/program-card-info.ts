import prisma from "@database";

/**
 * @param {string} id - programId
 */
async function getClassInfoWithProgramId(id: string) {
    const findResults = await prisma.class.findMany({
        where: {
            programId: parseInt(id),
            isArchived: false,
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
        },
    });
    return findResults;
}

/**
 * Get every program's card info
 */
async function getProgramCardInfos() {
    const findResult = await prisma.program.findMany({
        where: {
            isArchived: false,
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
 */
async function getProgramCardInfo(id: string) {
    const findResult = await prisma.program.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            programTranslation: true,
        },
    });

    return findResult;
}
export { getProgramCardInfos, getProgramCardInfo, getClassInfoWithProgramId };
