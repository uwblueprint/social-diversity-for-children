import { CreateClassInput } from "models/Class";

/**
 * validateCreateClass takes input of type createClassInput and validates the input for creating a class
 * @param input - data corresponding to a new class
 * @returns string[] - array of errors of type string
 */
export function validateCreateClass(input: CreateClassInput): string[] {
    const validationErrors = [];
    const start_date = new Date(input.startDate);
    const end_date = new Date(input.endDate);

    // TODO: Add more validation for creating a class if there exists anymore.
    if (start_date > end_date) {
        validationErrors.push("End date cannot be before the start date");
    }
    return validationErrors;
}
