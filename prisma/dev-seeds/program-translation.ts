import { locale, ProgramTranslation } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed program translation data
const programTranslations: ProgramTranslation[] = [
    {
        programId: 1,
        name: "Building Bridges with Music",
        description:
            "Building Bridges with Music is a music program where children with special needs will be able to connect with the music teacher through weekly class sessions to socialize and have fun while learning about music! This program will provide a safe environment for children to participate in interactive activities and build strong relationships during these unprecedented times! We will be offering both in-person and online options for this program in the Fall 2021 semester.",
        language: locale.en,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        programId: 1,
        name: "音乐之桥",
        description:
            "有特殊需要的儿童将能够通过线上视频教课跟音乐老师在交际和玩乐的环境下学习音乐！",
        language: locale.zh,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        programId: 1,
        name: "Building Bridges with Music",
        description:
            "아이들은 영상 통화로 음악을 배우며 선생님과 대화하고 즐길 수 있습니다.",
        language: locale.ko,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        programId: 1,
        name: "音乐之桥",
        description:
            "有特殊需要的儿童将能够通过线上视频教课跟音乐老师在交际和玩乐的环境下学习音乐！",
        language: locale.zh,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        programId: 1,
        name: "Building Bridges with Music",
        description:
            "아이들은 영상 통화로 음악을 배우며 선생님과 대화하고 즐길 수 있습니다.",
        language: locale.ko,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        programId: 2,
        name: "Education Through Creativity",
        description:
            "Education Through Creativity  is an art program where children with special needs will be guided to develop their social skills and learn to communicate their thoughts and emotions through art. Led by an experienced art teacher, children will be able to build lasting friendships, learn more about expression, and partake in fun interactive activities while enjoying the beauty of art! We will be offering both in-person and online options for this program in the Fall 2021 semester.",
        language: locale.en,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        programId: 2,
        name: "创意艺术",
        description:
            "有特殊需要的儿童将能够通过线上视频教课跟音乐老师在交际和玩乐的环境下学习音乐！",
        language: locale.zh,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        programId: 2,
        name: "Education Through Creativity",
        description:
            "아이들은 영상 통화로 음악을 배우며 선생님과 대화하고 즐길 수 있습니다.",
        language: locale.ko,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        programId: 2,
        name: "创意艺术",
        description:
            "有特殊需要的儿童将能够通过线上视频教课跟音乐老师在交际和玩乐的环境下学习音乐！",
        language: locale.zh,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        programId: 2,
        name: "Education Through Creativity",
        description:
            "아이들은 영상 통화로 음악을 배우며 선생님과 대화하고 즐길 수 있습니다.",
        language: locale.ko,
        createdAt: new Date(),
        updatedAt: null,
    },
];

/**
 * Upsert program translations
 * @param data custom data to upsert
 */
export default async function programTranslationsUpsert(
    data?: ProgramTranslation[],
): Promise<void> {
    for (const translation of data || programTranslations) {
        const { programId, language, createdAt, updatedAt, ...rest } =
            translation;
        await prisma.programTranslation
            .upsert({
                where: {
                    programId_language: { programId, language },
                },
                update: rest,
                create: {
                    programId,
                    language,
                    createdAt,
                    updatedAt,
                    ...rest,
                },
            })
            .catch((err) => console.log(err));
    }
}
