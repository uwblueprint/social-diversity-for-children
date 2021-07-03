import { WaitlistInput } from "models/Waitlist";

/**
 * validateWaitlistRecord takes input of type WaitlistInput and validates the input
 * @param input - data corresponding to a waitlist
 * @returns string[] - array of errors of type string
 */
export function validateWaitlistRecord(input: WaitlistInput): string[] {
    const validationErrors = [];

    if (!input.classId) {
        validationErrors.push("classId is not provided");
    }

    if (!input.parentId) {
        validationErrors.push("parentId is not provided");
    }

    return validationErrors;
}
