import { CreateProgramInput } from "@models/Program";

/**
 * validateCreateProgram takes programData of type Program and validates the data
 * @param newProgramData - data corresponding to new program
 * @returns string[] - array of errors of type string
 */
export function validateCreateProgram(
    newProgramData: CreateProgramInput,
): string[] {
    const validationError = [];
    const startDate = new Date(newProgramData.startDate);
    const endDate = new Date(newProgramData.endDate);
    if (newProgramData.price < 0) {
        validationError.push("Program price cannot be negative");
    }
    if (startDate > endDate) {
        validationError.push("End date cannot be before the start date");
    }
    return validationError;
}