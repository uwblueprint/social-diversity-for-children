import prisma from "@database";
import { locale } from "@prisma/client";

/**
 * @param {string} id - programId
 */
async function getClassInfoWithProgramId(id: string, language: locale) {
    const findResults = await prisma.class.findMany({
        where: {
            programId: parseInt(id),
            isArchived: false,
        },
        include: {
            classTranslation: {
                where: {
                    language: language,
                },
            },
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
async function getProgramCardInfos(language: locale) {
    const findResult = await prisma.program.findMany({
        where: {
            isArchived: false,
        },
        include: {
            programTranslation: {
                where: {
                    language: language,
                },
            },
        },
    });
    return findResult;
}

/**
 * Get the card info for one program with given id
 * @param {string} id - programId
 */
async function getProgramCardInfo(id: string, language: locale) {
    const findResult = await prisma.program.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            programTranslation: {
                where: {
                    language: language,
                },
            },
        },
    });

    return findResult;
}
export { getProgramCardInfos, getProgramCardInfo, getClassInfoWithProgramId };
