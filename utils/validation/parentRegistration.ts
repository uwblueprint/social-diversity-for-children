import { ParentRegistrationInput } from "@models/ParentRegistration";

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
