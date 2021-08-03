import type { province } from "@prisma/client";
/**
 * Request Body Input for Student
 */
export type CreateStudentInput = {
    firstName: string;
    lastName: string;
    parentId: number;
    dateOfBirth: Date;
    addressLine1: string;
    addressLine2?: string;
    postalCode?: string;
    cityName?: string;
    province?: province;
    school?: string;
    grade?: number;
    // Eric: TODO for Jason to add difficulties and therapy
    specialEducation?: boolean;
    guardianExpectations?: string;
    medication?: string;
    allergies?: string;
    additionalInfo?: string;
    emergFirstName: string;
    emergLastName: string;
    emergNumber: string;
    emergRelationToStudent: string;
};
