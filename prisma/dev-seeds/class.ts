import { Class, weekday } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed class data
const classes: Class[] = [
    {
        id: 1,
        name: "Singing Monkeys",
        ageGroup: "9 and under",
        imageLink: "https://media0.giphy.com/media/dNgK7Ws7y176U/giphy_s.gif",
        programId: 1,
        spaceTotal: 10,
        spaceAvailable: 10,
        volunteerSpaceTotal: 2,
        volunteerSpaceAvailable: 2,
        isArchived: false,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        weekday: weekday.WED,
        startTimeMinutes: 1080,
        durationMinutes: 60,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 2,
        name: "Singing Giraffes",
        ageGroup: "10 and above",
        imageLink:
            "https://media4.giphy.com/media/8OGIYNULdLNOE/giphy.gif?cid=ecf05e471dv24mebe5hsbyyuk9af2jnztcvo484u3r71911r&rid=giphy.gif&ct=g",
        programId: 1,
        spaceTotal: 10,
        spaceAvailable: 10,
        volunteerSpaceTotal: 2,
        volunteerSpaceAvailable: 2,
        isArchived: false,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
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
