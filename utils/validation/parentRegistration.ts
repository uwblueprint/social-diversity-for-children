import { ParentRegistrationInput } from "models/ParentRegistration";

/**
 * validateParentRegistrationRecord validates the request body which contains the details
 * of the parent enrollment
 * @param {ParentRegistrationInput} input the data containing the details of the enrollment
 * @returns {string[]} a list of validation errors
 */
export function validateParentRegistrationRecord(
    input: ParentRegistrationInput,
): string[] {
    const validationErrors: string[] = [];
    if (!input.parentId) {
        validationErrors.push("parentId is not provided");
    }
    if (!input.studentId) {
        validationErrors.push("studentId is not provided");
    }
    if (!input.classId) {
        validationErrors.push("classId is not provided");
    }

    return validationErrors;
}
