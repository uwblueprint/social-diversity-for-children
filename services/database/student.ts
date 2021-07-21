import prisma from "@database";
import { Student } from "@prisma/client";
import { CreateStudentInput } from "@models/Student";

/**
 * createStudent creates a new student record
 * @param input - data of type createStudentInput
 * @returns Promise<Student> - Promise with the newly created student
 */
async function createStudent(input: CreateStudentInput): Promise<Student> {
    const newStudent = await prisma.student.create({
        data: {
            firstName: input.firstName,
            lastName: input.lastName,
            allergies: input.allergies,
            additionalInfo: input.additionalInfo,
            parentOfStudents: {
                create: {
                    parentId: input.parentId,
                },
            },
        },
    });
    return newStudent;
}

/**
 * deleteStudent takes in id of the student and returns the deleted student
 * @param id - studentId of the student to be deleted
 * @returns Promise<Student> - Promise with the deleted student
 */
async function deleteStudent(id: string): Promise<Student> {
    const deletedStudent = await prisma.student.delete({
        where: {
            id: parseInt(id),
        },
    });
    return deletedStudent;
}

export { createStudent, deleteStudent };
