import { roles, User } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

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
    {
        id: 2,
        firstName: "John",
        lastName: "Doe",
        email: "ricksonyang+teacher2@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.TEACHER,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 3,
        firstName: "Rickson",
        lastName: "Yang",
        email: "ricksonyang+volunteer@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.VOLUNTEER,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 4,
        firstName: "Rickson",
        lastName: "Yang",
        email: "ricksonyang+parent@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.PARENT,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 5,
        firstName: "Rebecca",
        lastName: "Ma",
        email: "rebeccama+volunteer@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.VOLUNTEER,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 6,
        firstName: "Rebecca",
        lastName: "Ma",
        email: "rebeccama+parent@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.PARENT,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 7,
        firstName: "Vedant",
        lastName: "Patel",
        email: "vedantpatel+volunteer@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.VOLUNTEER,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 8,
        firstName: "Vedant",
        lastName: "Patel",
        email: "vedantpatel+parent@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.PARENT,
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
