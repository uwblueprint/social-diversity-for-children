import { roles, User } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed user data
const users: User[] = [
    {
        id: 1,
        firstName: "Rickson",
        lastName: "Yang",
        email: "ricksonyang+teacher@uwblueprint.org",
        emailVerified: new Date(),
        role: roles.TEACHER,
        image: "https://lh3.googleusercontent.com/fife/AAWUweVbAMrzMwjvDOdWQCcXropikyf3TaxEEMvtPNcyxdAmHO_TUGOCaAZwSPGZMcLch4T8AWiEC3MOFNLXhkfrs60VB3igUn00IwY7K1Aa1tZKvi-kc2sRwq9u7gmRaMjJ9PyyLdhXYFAOWphrXLD10NLYb_wZBSUymKNNfVBjT5ieCddAfH84ffI1wdDjQjKHmq5jM0BSPh0pKM41PwuDcXYeEJ82GFNmjvmf9O-w1X2TbcnTp5qqeEcEJz51rZleAMXNpw4mf2Rf7S_PXbrNwrc4rWJn6_YORn-I5gcnm1O8smSUAgdUF7FQxlMiLg0D6yjjuJYQA2mgEmW1Ox6kizyVh5g6ufPCAPoFIHqBATjVxB4UwZgEGKP5jLydzIYHvDHdMGEayLh0BWMiXD3c1r10DRIUVfjOW0zv-FdecEQvMeOV4NJcKDHTWy1p-IKeGl34vyT3uWJ-j2uCF--Vb4kDOKyqvJ18DwtVmAoX21BoKGz8YjINy2d2BshlYzBbxIzxn3NxBh3hPZ_4G9iLjtXmcbwTsOe60c6EbY9jLEXjiwdWY7fYZU81Wj93e79IzPoM2lckCqRkjUv7XYm0-sC19MSy-Z5OVsZCbm-7LD-jd9VpqQzIn1L3T8ndL2lZlWM-_-yAhJPlH6QSWOoLx-J5gxB9GYym0JVWdphdCwdCzB2bO7SUo39IHFRvdAlJWlr1h4El-9-JtlulBDi0rre8JJRDJL1avyIZYMpqJa3W3Q=s83-c",
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
