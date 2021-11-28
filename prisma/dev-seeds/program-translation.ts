import { locale, ProgramTranslation } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed program translation data
const programTranslations: ProgramTranslation[] = [
    {
        programId: 10000,
        name: "Building Bridges with Music",
        description:
            "Building Bridges with Music is a music program where children with special needs will be able to connect with the music teacher through weekly class sessions to socialize and have fun while learning about music! This program will provide a safe environment for children to participate in interactive activities and build strong relationships during these unprecedented times! We will be offering both in-person and online options for this program in the Fall 2021 semester.",
        language: locale.en,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        programId: 10000,
        name: "音乐之桥",
        description:
            "与音乐建立桥梁是一个音乐课程，有特殊需要的孩子将能够通过每周的课程与音乐老师联系，在学习音乐的同时拥有乐趣和进行社交！这个课程将为孩子们提供一个安全的环境，让他们在这个前所未有的时代参与互动活动，建立牢固的关系!在2021年秋季学期，我们将提供面对面和在线的课程的选择。",
        language: locale.zh,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        programId: 10000,
        name: "Building Bridges with Music",
        description:
            "Building Bridges with Music (이하 BBM)은 특수한 도움이 필요한 아동들이 매주 음악선생님과 함께 사교성을 기르고 놀면서 음악에 대해 배울 수 있는 기회를 제공합니다. BBM을 통해서 아이들은 비대면으로 안전하게 서로 관계를 형성할 수 있습니다. 2021년 가을 학기에는 대면 비대면 수업을 둘 다 제공합니다.",
        language: locale.ko,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        programId: 10001,
        name: "Education Through Creativity",
        description:
            "Education Through Creativity  is an art program where children with special needs will be guided to develop their social skills and learn to communicate their thoughts and emotions through art. Led by an experienced art teacher, children will be able to build lasting friendships, learn more about expression, and partake in fun interactive activities while enjoying the beauty of art! We will be offering both in-person and online options for this program in the Fall 2021 semester.",
        language: locale.en,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        programId: 10001,
        name: "创意艺术",
        description:
            "Education Through Creativity是一个艺术课程，有特殊需要的儿童将被引导发展他们的社交技能，并学习通过艺术来交流他们的思想和情感。在经验丰富的美术老师的带领下，孩子们将能够建立持久的友谊，学习更多的表达，并参与有趣的互动活动，同时享受艺术之美！在2021年秋季学期，我们将提供面对面和在线的课程选择。",
        language: locale.zh,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        programId: 10001,
        name: "Education Through Creativity",
        description:
            "Education Through Creativity (이하 ETC)는 특수한 도움이 필요한 아동들이 사회능력을 기르고 미술을 통해 소통하는 법을 지도하는 프로그램입니다. 참가 아동은 경험 있는 미술 선생님과 함께 아이들은 서로 우정을 쌓고, 표현하는 방법을 배우고, 미술을 즐길 수 있습니다. 2021년 가을 학기에는 대면, 비대면 수업을 둘 다 제공합니다.",
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
