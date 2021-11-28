import { ParentRegistrationInput } from "@models/Enroll";
import { Student } from "@prisma/client";
import { mutate } from "swr";

/**
 * deleteClassRegistrations deletes registrations for a class given a list of students
 * @param students students' records to delete
 * @param classId id of class to delete from
 * @returns list of deleted records
 */
export async function deleteClassRegistrations(
    students: Student[],
    classId: number,
) {
    return students.map((student) => deleteClassRegistration(student, classId));
}

/**
 * deleteClassRegistration deletes a registration for a class given a student
 * @param student student's record to delete
 * @param classId id of class to delete from
 * @returns deleted records
 */
export async function deleteClassRegistration(student: Student, classId: number) {
    const registrationData: ParentRegistrationInput = {
        classId,
        studentId: student.id,
        parentId: student.parentId,
    };
    const request = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
    };

    const response = await fetch("/api/enroll/child", request);
    const deletedRegistration = await response.json();

    mutate("/api/enroll/child");

    return deletedRegistration;
}
