import { Program } from "models/Program";

/**
 * validateProgram takes programData of type Program and validates the data
 * @param newProgramData - data corresponding to new program
 * @returns true: validated, false: not validated
 */
export function validateProgram(newProgramData: Program) {
    const start_date = new Date(newProgramData.start_date);
    const end_date = new Date(newProgramData.end_date);
    if (newProgramData.price < 0) {
        return false;
    } else if (start_date > end_date) {
        return false;
    } else if (newProgramData.space_total != newProgramData.space_available) {
        return false;
    } else if (
        newProgramData.volunteer_space_total !=
        newProgramData.volunteer_space_available
    ) {
        return false;
    } else {
        return true;
    }
}
