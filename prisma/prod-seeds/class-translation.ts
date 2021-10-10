import { locale } from ".prisma/client";
import { ClassTranslation } from "@prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed class translation data
const classTranslations: ClassTranslation[] = [
    {
        classId: 1,
        name: "Singing Monkeys",
        description:
            "Children with special needs will be able to connect with the music teacher through an online video call to socialize and have fun while learning about music!",
        language: locale.en,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        classId: 2,
        name: "Singing Giraffes",
        description:
            "Children with special needs will be able to connect with the music teacher through an online video call to socialize and have fun while learning about music!",
        language: locale.en,
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
        const { classId, language, createdAt, updatedAt, ...rest } =
            translation;
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
