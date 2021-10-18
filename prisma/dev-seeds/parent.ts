import { heardFrom, locale, Parent } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed parent data
const parents: Parent[] = [
    {
        id: 4,
        phoneNumber: "1111111111",
        isLowIncome: false,
        preferredLanguage: locale.en,
        proofOfIncomeLink: null,
        heardFrom: [heardFrom.EMAIL],
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 6,
        phoneNumber: "1111111111",
        isLowIncome: false,
        preferredLanguage: locale.en,
        proofOfIncomeLink: null,
        heardFrom: [heardFrom.EMAIL],
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 8,
        phoneNumber: "1111111111",
        isLowIncome: false,
        preferredLanguage: locale.en,
        proofOfIncomeLink: null,
        heardFrom: [heardFrom.EMAIL],
        createdAt: new Date(),
        updatedAt: null,
    },
];

/**
 * Upsert parents
 * @param data custom data to upsert
 */
export default async function parentUpsert(data?: Parent[]): Promise<void> {
    for (const parent of data || parents) {
        const { id, updatedAt, ...rest } = parent;
        await prisma.parent
            .upsert({
                where: {
                    id,
                },
                update: rest,
                create: {
                    id,
                    updatedAt,
                    ...rest,
                },
            })
            .catch((err) => console.log(err));
    }
}