import { createProgramInput } from "models/Program";

/**
 * validateProgram takes programData of type Program and validates the data
 * @param newProgramData - data corresponding to new program
 * @returns true: validated, false: not validated
 */
export function validateCreateProgram(
    newProgramData: createProgramInput,
): boolean {
    const start_date = new Date(newProgramData.start_date);
    const end_date = new Date(newProgramData.end_date);
    if (newProgramData.price < 0) {
        return false;
    }
    if (start_date > end_date) {
        return false;
    }
    if (newProgramData.space_total != newProgramData.space_available) {
        return false;
    }
    if (
        newProgramData.volunteer_space_total !=
        newProgramData.volunteer_space_available
    ) {
        return false;
    }
    return true;
}
