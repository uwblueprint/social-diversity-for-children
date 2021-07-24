/**
 * Request Body Input for Student
 */
export type CreateStudentInput = {
    firstName: string;
    lastName: string;
    allergies: string;
    additionalInfo?: string;
    parentId: number;
};
