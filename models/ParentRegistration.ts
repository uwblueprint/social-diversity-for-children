/**
 * Request Body Input For Parent Enrollment
 */
export type ParentRegistrationInput = {
    /** Unique identifier of the parent enrolling their child */
    parentId: number;
    /** Unique identifier of the child being enrolled */
    studentId: number;
    /** Unique identifier of the class the child is being enrolled in */
    classId: number;
};
