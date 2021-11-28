import { TeacherReg } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed teacher registrations data
const teacherRegs: TeacherReg[] = [
    {
        teacherId: 10000,
        classId: 10000,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        teacherId: 10000,
        classId: 10001,
        createdAt: new Date(),
        updatedAt: null,
    },
];

/**
 * Upsert teachers registrations
 * @param data custom data to upsert
 */
export default async function teacherRegUpsert(
    data?: TeacherReg[],
): Promise<void> {
    for (const teacherReg of data || teacherRegs) {
        const { teacherId, classId, updatedAt, ...rest } = teacherReg;
        await prisma.teacherReg
            .upsert({
                where: {
                    classId_teacherId: { classId, teacherId },
                },
                update: rest,
                create: {
                    teacherId,
                    classId,
                    updatedAt,
                    ...rest,
                },
            })
            .catch((err) => console.log(err));
    }
}
