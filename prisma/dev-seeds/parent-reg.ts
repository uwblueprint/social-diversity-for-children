import { ParentReg } from ".prisma/client";
import prisma from "../../services/database"; // Relative path required, aliases throw error using seed

// Seed parent registrations data
const parentRegs: ParentReg[] = [
    {
        parentId: 4,
        studentId: 1,
        classId: 1,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        parentId: 6,
        studentId: 3,
        classId: 1,
        createdAt: new Date(),
        updatedAt: null,
    },
    {
        parentId: 8,
        studentId: 5,
        classId: 1,
        createdAt: new Date(),
        updatedAt: null,
    },
];

/**
 * Upsert parent registrations
 * @param data custom data to upsert
 */
export default async function parentRegUpsert(
    data?: ParentReg[],
): Promise<void> {
    for (const parentReg of data || parentRegs) {
        const { parentId, studentId, classId, updatedAt, ...rest } = parentReg;
        await prisma.parentReg
            .upsert({
                where: {
                    parentId_studentId_classId: {
                        parentId,
                        studentId,
                        classId,
                    },
                },
                update: rest,
                create: {
                    parentId,
                    studentId,
                    classId,
                    updatedAt,
                    ...rest,
                },
            })
            .catch((err) => console.log(err));
    }
}
