import { Teacher } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed teacher data
const teachers: Teacher[] = [
    {
        id: 1,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 2,
        createdAt: new Date(),
        updatedAt: null,
    },
];

/**
 * Upsert teachers
 * @param data custom data to upsert
 */
export default async function teacherUpsert(data?: Teacher[]): Promise<void> {
    for (const teacher of data || teachers) {
        const { id, updatedAt, ...rest } = teacher;
        await prisma.teacher
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
