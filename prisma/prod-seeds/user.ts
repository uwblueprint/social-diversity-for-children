import { roles, User } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// TODO: Replace teachers with SDC internal users
// Seed user data
const users: User[] = [
    {
        id: 1,
        firstName: "Brian",
        lastName: "Anderson",
        email: "ricksonyang+teacher@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.TEACHER,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
];

/**
 * Upsert users
 * @param data custom data to upsert
 */
export default async function userUpsert(data?: User[]): Promise<void> {
    for (const user of data || users) {
        const { id, updatedAt, ...rest } = user;
        await prisma.user
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
