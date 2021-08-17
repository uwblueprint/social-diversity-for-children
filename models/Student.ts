import type { difficulties, province, therapy } from "@prisma/client";
/**
 * Request Body Input for Student
 */
export type CreateStudentInput = {
    firstName: string;
    lastName: string;
    parentId?: number;
    dateOfBirth: Date;
    addressLine1: string;
    addressLine2?: string;
    postalCode?: string;
    cityName?: string;
    province?: province;
    school?: string;
    grade?: number;
    difficulties?: difficulties[];
    otherDifficulties?: string;
    specialEducation?: boolean;
    therapy?: therapy[];
    otherTherapy?: string;
    guardianExpectations?: string;
    medication?: string;
    allergies?: string;
    additionalInfo?: string;
    emergFirstName: string;
    emergLastName: string;
    emergNumber: string;
    emergRelationToStudent: string;
};
