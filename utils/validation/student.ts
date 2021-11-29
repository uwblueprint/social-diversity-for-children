import { CreateStudentInput } from "@models/Student";
import { getUser } from "@database/user";
import { roles } from "@prisma/client";

/**
 * validateCreateStudent takes input of type createStudentInput and validates the input for creating a student
 * @param input - data corresponding to a new student
 * @returns string[] - array of errors of type string
 */
export async function validateCreateStudent(input: CreateStudentInput): Promise<string[]> {
    const validationErrors = [];

    const user = await getUser(input.parentId.toString());
    if (!user) {
        validationErrors.push(`User with id ${user.id} not found.`);
    }

    if (user.role !== roles.PARENT) {
        validationErrors.push("User is not a parent.");
    }

    return validationErrors;
}
