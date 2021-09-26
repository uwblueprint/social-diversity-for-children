import { ClassCardInfo } from "./Class";
import { ProgramCardInfo } from "./Program";
import { StudentCardInfo } from "./Student";

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

/**
 * Request Body Input For Volunteer Enrollment
 */
export type VolunteerRegistrationInput = {
    /** Unique identifier of the volunteer */
    volunteerId: number;
    /** Unique identifier of the class the volunteer is being enrolled in */
    classId: number;
};

/**
 * Information used for the card component of a program registration
 */
export type EnrollmentCardInfo = {
    classId: number;
    createdAt: Date;
    class: ClassCardInfo;
    student: StudentCardInfo;
    program: ProgramCardInfo;
};

/**
 * Information used for combined card component of a program registration
 */
export type CombinedEnrollmentCardInfo = {
    classId: number;
    createdAt: Date;
    class: ClassCardInfo;
    students: StudentCardInfo[];
    program: ProgramCardInfo;
};
