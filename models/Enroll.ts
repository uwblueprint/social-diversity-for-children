import { Student, User } from "@prisma/client";
import { ClassCardInfo } from "./Class";
import { ProgramCardInfo } from "./Program";

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
    student: Student;
    program: ProgramCardInfo;
};

/**
 * Information used for the volunteer card component of my classes page
 */
export type VolunteeringCardInfo = {
    classId: number;
    createdAt: Date;
    class: ClassCardInfo;
    volunteer: User;
    program: ProgramCardInfo;
};

/**
 * Information used for combined card component of a program registration
 */
export type CombinedEnrollmentCardInfo = {
    classId: number;
    createdAt: Date;
    class: ClassCardInfo;
    students: Student[];
    program: ProgramCardInfo;
};
