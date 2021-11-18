import { roles, User } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed user data
const users: User[] = [
    {
        id: 10000,
        firstName: "Brian",
        lastName: "Anderson",
        email: "ricksonyang+teacher1@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.TEACHER,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 10001,
        firstName: "Julian",
        lastName: "Ku",
        email: "ricksonyang+teacher2@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.TEACHER,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 10002,
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
        id: 10003,
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
        id: 10004,
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
        id: 10005,
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
        id: 10006,
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
        id: 10007,
        firstName: "Vedant",
        lastName: "Patel",
        email: "vedantpatel+parent@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.PARENT,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 10008,
        firstName: "Rickson",
        lastName: "Yang",
        email: "ricksonyang+teacher@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.TEACHER,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 10009,
        firstName: "Rebecca",
        lastName: "Ma",
        email: "rebeccama+teacher@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.TEACHER,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 10010,
        firstName: "Vedant",
        lastName: "Patel",
        email: "vedantpatel+teacher@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.TEACHER,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 10011,
        firstName: "Rickson",
        lastName: "Yang",
        email: "ricksonyang+admin@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.PROGRAM_ADMIN,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 10012,
        firstName: "Rebecca",
        lastName: "Ma",
        email: "rebeccama+admin@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.PROGRAM_ADMIN,
        image: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 10013,
        firstName: "Vedant",
        lastName: "Patel",
        email: "vedantpatel+admin@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.PROGRAM_ADMIN,
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
