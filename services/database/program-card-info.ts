import prisma from "@database";
import { ProgramCardInfo } from "models/Program";
import { ClassCardInfo } from "models/Class";
import { locale } from "@prisma/client";

/**
 * @param {string} id - programId
 */
async function getClassInfoWithProgramId(id: string): Promise<ClassCardInfo[]> {
    const findResults = await prisma.class.findMany({
        where: {
            programId: parseInt(id),
            isArchived: false,
        },
        select: {
            ageGroup: true,
            spaceTotal: true,
            id: true,
            name: true,
            spaceAvailable: true,
            volunteerSpaceTotal: true,
            volunteerSpaceAvailable: true,
            startDate: true,
            endDate: true,
            weekday: true,
            startTimeMinutes: true,
            durationMinutes: true,
            imageLink: true,

            classTranslation: {
                where: {
                    language: locale.en, // TODO dont hardcode language
                },
                select: {
                    name: true,
                    description: true,
                },
            },
            teacherRegs: {
                select: {
                    teacher: {
                        select: {
                            user: true,
                        },
                    },
                },
            },
        },
    });
    return findResults.map((result) => {
        return {
            ageGroup: result.ageGroup,
            spaceTotal: result.spaceTotal,
            id: result.id,
            image: result.imageLink,
            spaceAvailable: result.spaceAvailable,
            volunteerSpaceTotal: result.volunteerSpaceTotal,
            volunteerSpaceAvailable: result.volunteerSpaceAvailable,
            startDate: result.startDate,
            endDate: result.endDate,
            weekday: result.weekday,
            startTimeMinutes: result.startTimeMinutes,
            durationMinutes: result.durationMinutes,
            name:
                result.classTranslation.length > 0
                    ? result.classTranslation[0].name
                    : result.name,
            description:
                result.classTranslation.length > 0
                    ? result.classTranslation[0].description
                    : "",
            teacherName:
                result.teacherRegs.length > 0
                    ? result.teacherRegs[0].teacher.user.firstName +
                      " " +
                      result.teacherRegs[0].teacher.user.lastName
                    : "",
            teacherEmail:
                result.teacherRegs.length > 0
                    ? result.teacherRegs[0].teacher.user.email
                    : "",
            teacherImage:
                result.teacherRegs.length > 0
                    ? result.teacherRegs[0].teacher.user.image
                    : "",
        };
    });
}

/**
 * Get every program's card info
 */
async function getProgramCardInfos(): Promise<ProgramCardInfo[]> {
    const findResult = await prisma.program.findMany({
        where: {
            isArchived: false,
        },
        select: {
            id: true,
            startDate: true,
            endDate: true,
            tag: true,
            onlineFormat: true,
            price: true,
            imageLink: true,

            programTranslation: {
                where: {
                    language: locale.en,
                },
            },
        },
    });
    return findResult.map((p) => {
        return {
            id: p.id,
            image: p.imageLink,
            price: p.price,
            name:
                p.programTranslation.length > 0
                    ? p.programTranslation[0].name
                    : "",
            description:
                p.programTranslation.length > 0
                    ? p.programTranslation[0].description
                    : "",
            startDate: p.startDate,
            endDate: p.endDate,
            tag: p.tag,
            onlineFormat: p.onlineFormat,
        };
    });
}

/**
 * Get the card info for one program with given id
 * @param {string} id - programId
 */
async function getProgramCardInfo(id: string): Promise<ProgramCardInfo> {
    const findResult = await prisma.program.findUnique({
        where: {
            id: parseInt(id),
        },
        select: {
            id: true,
            startDate: true,
            endDate: true,
            tag: true,
            onlineFormat: true,
            price: true,
            imageLink: true,

            programTranslation: {
                where: {
                    language: locale.en,
                },
            },
        },
    });

    return {
        id: findResult.id,
        image: findResult.imageLink,
        price: findResult.price,
        name:
            findResult.programTranslation.length > 0
                ? findResult.programTranslation[0].name
                : "",
        description:
            findResult.programTranslation.length > 0
                ? findResult.programTranslation[0].description
                : "",
        startDate: findResult.startDate,
        endDate: findResult.endDate,
        tag: findResult.tag,
        onlineFormat: findResult.onlineFormat,
    };
}
export { getProgramCardInfos, getProgramCardInfo, getClassInfoWithProgramId };
