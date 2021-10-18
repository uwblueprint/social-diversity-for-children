import { VolunteerReg } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed volunteer registrations data
const volunteerRegs: VolunteerReg[] = [
    {
        volunteerId: 3,
        classId: 1,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        volunteerId: 5,
        classId: 1,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        volunteerId: 7,
        classId: 1,
        createdAt: new Date(),
        updatedAt: null,
    },
];

/**
 * Upsert volunteer registrations
 * @param data custom data to upsert
 */
export default async function volunteerRegUpsert(
    data?: VolunteerReg[],
): Promise<void> {
    for (const volunteerReg of data || volunteerRegs) {
        const { volunteerId, classId, updatedAt, ...rest } = volunteerReg;
        await prisma.volunteerReg
            .upsert({
                where: {
                    volunteerId_classId: { volunteerId, classId },
                },
                update: rest,
                create: {
                    volunteerId,
                    classId,
                    updatedAt,
                    ...rest,
                },
            })
            .catch((err) => console.log(err));
    }
}
