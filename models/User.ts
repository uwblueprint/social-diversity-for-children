import type { roles, province, locale, heardFrom } from "@prisma/client";

/* Input type for Parent inputs */
export type ParentInput = {
    // Parent Information
    phoneNumber: string;
    isLowIncome?: boolean;
    preferredLanguage: locale;
    proofOfIncomeLink?: string;
    heardFrom?: heardFrom;

    // Child Information
    childFirstName: string;
    childLastName: string;
    childDateOfBirth: Date;
    addressLine1: string;
    addressLine2?: string;
    postalCode: string;
    cityName: string;
    province: province;
    school?: string;
    grade?: number;
    // Currently missing information about difficulties and therapy
    learningDifficulties?: boolean;
    physicalDifficulties?: boolean;
    sensoryDifficulties?: boolean;
    otherDifficulties?: boolean;
    specialEducation?: boolean;
    physiotherapy?: boolean;
    speechTherapy?: boolean;
    occupationalTherapy?: boolean;
    counseling?: boolean;
    artTherapy?: boolean;
    otherTherapy?: boolean;
    guardianExpectations?: string;
    additionalInfo?: string;
    emergencyContactFirstName: string;
    emergencyContactLastName: string;
    emergencyContactPhoneNumber: string;
    emergencyContactRelationToStudent: string;
    medication?: string;
    allergies?: string;
};

/* Input type for Volunteer inputs */
export type VolunteerInput = {
    phoneNumber?: string;
    isValid?: boolean;
    backgroundFormLink?: string;
    addressLine1?: string;
    addressLine2?: string;
    postalCode?: string;
    cityName?: string;
    province?: province;
    preferredLanguage?: locale;
};

/* Input type for Program Admins inputs */
export type ProgramAdminInput = Record<string, never>;

// NOTE: not for MVP
// type TeacherInput = Record<string, never>;

/* Input type for User endpoints */
export type UserInput = {
    id: string;
    firstName?: string;
    lastName?: string;
    role?: roles;
    roleData?: ParentInput | ProgramAdminInput | VolunteerInput;
};
