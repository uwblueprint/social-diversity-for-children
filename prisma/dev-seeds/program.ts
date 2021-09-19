import { Program, programFormat } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed program data
const programs: Program[] = [
    {
        id: 1,
        price: 0,
        onlineFormat: programFormat.online,
        tag: "Music",
        imageLink:
            "https://images.squarespace-cdn.com/content/v1/5e83092341f99d6d384777ef/1608341017251-K0Q0U7BC37SQ5BGCV9G0/IMG_6646.jpg?format=750w",
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        isArchived: false,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 2,
        price: 0,
        onlineFormat: programFormat.online,
        tag: "Art",
        imageLink:
            "https://images.squarespace-cdn.com/content/v1/5e83092341f99d6d384777ef/1608341093598-U3AGJCLP1UHUPZJNTYBY/IMG_2791.jpg?format=750w",
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        isArchived: false,
        createdAt: new Date(),
        updatedAt: null,
    },
];

/**
 * Upsert programs
 * @param data custom data to upsert
 */
export default async function programUpsert(data?: Program[]): Promise<void> {
    for (const program of data || programs) {
        const { id, updatedAt, ...rest } = program;
        const programUpsert = await prisma.program.upsert({
            where: {
                id,
            },
            update: rest,
            create: {
                id,
                updatedAt,
                ...rest,
            },
        });
        console.log({ programUpsert });
    }
}
