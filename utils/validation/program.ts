import { createProgramInput } from "models/Program";

/**
 * validateProgram takes programData of type Program and validates the data
 * @param newProgramData - data corresponding to new program
 * @returns true: validated, false: not validated
 */
export function validateCreateProgram(
    newProgramData: createProgramInput,
): string[] {
    const validationError = [];
    const start_date = new Date(newProgramData.start_date);
    const end_date = new Date(newProgramData.end_date);
    if (newProgramData.price < 0) {
        validationError.push("Program price cannot be negative");
    }
    if (start_date > end_date) {
        validationError.push("End date cannot be before the start date");
    }
    if (newProgramData.space_total != newProgramData.space_available) {
        validationError.push(
            "The space available does not match the total space",
        );
    }
    if (
        newProgramData.volunteer_space_total !=
        newProgramData.volunteer_space_available
    ) {
        validationError.push(
            "The volunteer space available does not match the total volunteer space",
        );
    }
    return validationError;
}
