import { createProgramInput } from "models/Program";

/**
 * validateProgram takes programData of type Program and validates the data
 * @param newProgramData - data corresponding to new program
 * @returns string[] - array of errors of type string
 */
export function validateCreateProgram(
    newProgramData: createProgramInput,
): string[] {
    const validationError = [];
    const start_date = new Date(newProgramData.startDate);
    const end_date = new Date(newProgramData.endDate);
    if (newProgramData.price < 0) {
        validationError.push("Program price cannot be negative");
    }
    if (start_date > end_date) {
        validationError.push("End date cannot be before the start date");
    }
    return validationError;
}
