import { ParentRegistrationInput } from "@models/Enroll";
import { Student } from "@prisma/client";

/**
 * createClassRegistration creates a registration for a class given a student
 * @param student student's record to create
 * @param classId id of class to create the record to
 * @returns deleted records
 */
export async function createClassRegistration(
    student: Student,
    classId: number,
): Promise<Response> {
    const registrationData: ParentRegistrationInput = {
        parentId: student.parentId,
        classId: classId,
        studentId: student.id,
    };

    const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
    };

    const response = await fetch("/api/enroll/child", request);

    return response;
}
