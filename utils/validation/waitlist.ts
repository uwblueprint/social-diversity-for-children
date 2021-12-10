/**
 * validateWaitlistRecord takes classId and parentId and validates the input
 * @param classId
 * @param parentId
 * @returns string[] - array of errors of type string
 */
export function validateWaitlistRecord(classId: number, parentId: number): string[] {
    const validationErrors: string[] = [];

    if (!classId) {
        validationErrors.push("classId is not provided");
    }

    if (!parentId) {
        validationErrors.push("parentId is not provided");
    }

    return validationErrors;
}
