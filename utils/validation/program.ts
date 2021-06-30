import { createProgramInput } from "models/Program";

/**
 * validateProgram takes programData of type Program and validates the data
 * @param newProgramData - data corresponding to new program
 * @returns true: validated, false: not validated
 */
export function validateCreateProgram(
    newProgramData: createProgramInput,
): boolean {
    const start_date = new Date(newProgramData.startDate);
    const end_date = new Date(newProgramData.endDate);
    if (newProgramData.price < 0) {
        return false;
    }
    if (start_date > end_date) {
        return false;
    }
    if (newProgramData.spaceTotal != newProgramData.spaceAvailable) {
        return false;
    }
    if (
        newProgramData.volunteerSpaceTotal !=
        newProgramData.volunteerSpaceAvailable
    ) {
        return false;
    }
    return true;
}
