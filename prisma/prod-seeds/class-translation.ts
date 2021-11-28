import { locale } from ".prisma/client";
import { ClassTranslation } from "@prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed class translation data
const classTranslations: ClassTranslation[] = [
    {
        classId: 10000,
        name: "Singing Monkeys",
        description:
            "Children with special needs will be able to connect with the music teacher through an online video call to socialize and have fun while learning about music!",
        language: locale.en,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        classId: 10000,
        name: "會唱歌的猴子",
        description:
            "有特殊需要的儿童将能够通过线上视频教课跟音乐老师在交际和玩乐的环境下学习音乐！",
        language: locale.zh,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        classId: 10000,
        name: "Singing Monkeys",
        description:
            "아이들은 영상 통화로 음악을 배우며 선생님과 대화하고 즐길 수 있습니다.",
        language: locale.ko,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        classId: 10001,
        name: "Singing Giraffes",
        description:
            "Children with special needs will be able to connect with the music teacher through an online video call to socialize and have fun while learning about music!",
        language: locale.en,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        classId: 10001,
        name: "會唱歌的长颈鹿",
        description:
            "有特殊需要的儿童将能够通过线上视频教课跟音乐老师在交际和玩乐的环境下学习音乐！",
        language: locale.zh,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        classId: 10001,
        name: "Singing Giraffes",
        description:
            "아이들은 영상 통화로 음악을 배우며 선생님과 대화하고 즐길 수 있습니다.",
        language: locale.ko,
        createdAt: new Date(),
        updatedAt: null,
    },
];

/**
 * Upsert class translations
 * @param data custom data to upsert
 */
export default async function classTranslationsUpsert(
    data?: ClassTranslation[],
): Promise<void> {
    for (const translation of data || classTranslations) {
        const { classId, language, createdAt, updatedAt, ...rest } = translation;
        await prisma.classTranslation
            .upsert({
                where: {
                    classId_language: { classId, language },
                },
                update: rest,
                create: {
                    classId,
                    language,
                    createdAt,
                    updatedAt,
                    ...rest,
                },
            })
            .catch((err) => console.log(err));
    }
}
