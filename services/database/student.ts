import prisma from "@database";
import { Student } from "@prisma/client";
import { CreateStudentInput, UpdateStudentInput } from "@models/Student";

/**
 * getStudentCount returns count of all students
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getStudentCount() {
    return await prisma.student.count();
}

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
            dateOfBirth: input.dateOfBirth,
            addressLine1: input.addressLine1,
            addressLine2: input.addressLine2,
            postalCode: input.postalCode,
            cityName: input.cityName,
            province: input.province,
            school: input.school,
            grade: input.grade,
            specialEducation: input.specialEducation,
            guardianExpectations: input.guardianExpectations,
            medication: input.medication,
            allergies: input.allergies,
            additionalInfo: input.additionalInfo,
            emergFirstName: input.emergFirstName,
            emergLastName: input.emergLastName,
            emergNumber: input.emergNumber,
            emergRelationToStudent: input.emergRelationToStudent,
            therapy: input.therapy,
            difficulties: input.difficulties,
            parent: {
                connect: {
                    id: input.parentId,
                },
            },
        },
    });
    return newStudent;
}

/**
 * updateStudent updates a new student record
 * @param input - data of type createStudentInput
 * @returns Promise<Student> - Promise with the newly created student
 */
async function updateStudent(input: UpdateStudentInput): Promise<Student> {
    const newStudent = await prisma.student.upsert({
        update: {
            firstName: input.firstName,
            lastName: input.lastName,
            dateOfBirth: input.dateOfBirth,
            addressLine1: input.addressLine1,
            addressLine2: input.addressLine2,
            postalCode: input.postalCode,
            cityName: input.cityName,
            province: input.province,
            school: input.school,
            grade: input.grade,
            specialEducation: input.specialEducation,
            guardianExpectations: input.guardianExpectations,
            medication: input.medication,
            allergies: input.allergies,
            additionalInfo: input.additionalInfo,
            emergFirstName: input.emergFirstName,
            emergLastName: input.emergLastName,
            emergNumber: input.emergNumber,
            emergRelationToStudent: input.emergRelationToStudent,
            therapy: input.therapy,
            difficulties: input.difficulties,
        },
        create: {
            firstName: input.firstName,
            lastName: input.lastName,
            dateOfBirth: input.dateOfBirth,
            addressLine1: input.addressLine1,
            addressLine2: input.addressLine2,
            postalCode: input.postalCode,
            cityName: input.cityName,
            province: input.province,
            school: input.school,
            grade: input.grade,
            specialEducation: input.specialEducation,
            guardianExpectations: input.guardianExpectations,
            medication: input.medication,
            allergies: input.allergies,
            additionalInfo: input.additionalInfo,
            emergFirstName: input.emergFirstName,
            emergLastName: input.emergLastName,
            emergNumber: input.emergNumber,
            emergRelationToStudent: input.emergRelationToStudent,
            therapy: input.therapy,
            difficulties: input.difficulties,
            parent: {
                connect: {
                    id: input.parentId,
                },
            },
        },
        where: {
            id: input.id,
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

export { getStudentCount, createStudent, updateStudent, deleteStudent };
