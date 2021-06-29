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
        validationError.push("invalid program price was entered");
    }
    if (start_date > end_date) {
        validationError.push("invalid start and/or end date was entered");
    }
    if (newProgramData.space_total != newProgramData.space_available) {
        validationError.push(
            "invalid program space / program space available was entered",
        );
    }
    if (
        newProgramData.volunteer_space_total !=
        newProgramData.volunteer_space_available
    ) {
        validationError.push(
            "invalid volunteer space / volunteer space available was entered",
        );
    }
    return validationError;
}
