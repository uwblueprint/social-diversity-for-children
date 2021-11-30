import { ProgramAdmin } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed programAdmins data
const programAdmins: ProgramAdmin[] = [
    {
        id: 10011,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 10012,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 10013,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 10017,
        createdAt: new Date(),
        updatedAt: null,
    },
];

/**
 * Upsert programAdmins
 * @param data custom data to upsert
 */
export default async function programAdminUpsert(data?: ProgramAdmin[]): Promise<void> {
    for (const programAdmin of data || programAdmins) {
        const { id, updatedAt, ...rest } = programAdmin;
        await prisma.programAdmin
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
