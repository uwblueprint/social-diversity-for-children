import { locale, Volunteer } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed volunteer data
const volunteers: Volunteer[] = [
    {
        id: 10002,
        phoneNumber: null,
        dateOfBirth: new Date(),
        addressLine1: "999 Philips Street",
        criminalRecordCheckLink: null,
        criminalCheckApproved: false,
        criminalCheckExpired: false,
        postalCode: null,
        cityName: null,
        province: null,
        school: null,
        preferredLanguage: locale.en,
        skills: null,
        hearAboutUs: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 10004,
        phoneNumber: null,
        dateOfBirth: new Date(),
        addressLine1: "998 Philips Street",
        criminalRecordCheckLink: null,
        criminalCheckApproved: false,
        criminalCheckExpired: false,
        postalCode: null,
        cityName: null,
        province: null,
        school: null,
        preferredLanguage: locale.en,
        skills: null,
        hearAboutUs: null,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        id: 10006,
        phoneNumber: null,
        dateOfBirth: new Date(),
        addressLine1: "997 Philips Street",
        criminalRecordCheckLink: null,
        criminalCheckApproved: false,
        criminalCheckExpired: false,
        postalCode: null,
        cityName: null,
        province: null,
        school: null,
        preferredLanguage: locale.en,
        skills: null,
        hearAboutUs: null,
        createdAt: new Date(),
        updatedAt: null,
    },
];

/**
 * Upsert volunteers
 * @param data custom data to upsert
 */
export default async function volunteerUpsert(
    data?: Volunteer[],
): Promise<void> {
    for (const volunteer of data || volunteers) {
        const { id, updatedAt, ...rest } = volunteer;
        await prisma.volunteer
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
