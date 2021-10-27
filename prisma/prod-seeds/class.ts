import { Class, weekday } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed class data
const classes: Class[] = [
    {
        id: 10000,
        name: "Singing Monkeys",
        borderAge: 9,
        isAgeMinimal: false,
        imageLink: "https://i.imgur.com/2ZCdUW8.png",
        programId: 10000,
        stripePriceId: "price_1JmtVCL97YpjuvTOGSqYAdya",
        spaceTotal: 10,
        volunteerSpaceTotal: 5,
        isArchived: false,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 31)),
        weekday: weekday.WED,
        startTimeMinutes: 1080,
        durationMinutes: 60,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 10001,
        name: "Singing Giraffes",
        borderAge: 10,
        isAgeMinimal: true,
        imageLink: "https://i.imgur.com/Y4qw1al.png",
        programId: 10000,
        stripePriceId: "price_1JmtVpL97YpjuvTOaiyFxZqY",
        spaceTotal: 10,
        volunteerSpaceTotal: 5,
        isArchived: false,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 31)),
        weekday: weekday.THU,
        startTimeMinutes: 1080,
        durationMinutes: 60,
        createdAt: new Date(),
        updatedAt: null,
    },
];

/**
 * Upsert classes
 * @param data custom data to upsert
 */
export default async function classUpsert(data?: Class[]): Promise<void> {
    for (const classRecord of data || classes) {
        const { id, updatedAt, ...rest } = classRecord;
        await prisma.class
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
