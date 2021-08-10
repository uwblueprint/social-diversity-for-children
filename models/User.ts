import {
    roles,
    province,
    locale,
    difficulties,
    therapy,
    heardFrom,
} from "@prisma/client";

export { roles, province, locale, difficulties, therapy, heardFrom };

/* Input type for Parent inputs */
export type ParentInput = {
    // Parent Information
    // Note: first/last name are specified in UserInput
    phoneNumber: string;
    isLowIncome?: boolean;
    preferredLanguage: locale;
    proofOfIncomeLink?: string;
    heardFrom?: heardFrom[];
    heardFromOther?: string;

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
    difficulties?: difficulties[];
    otherDifficulties?: string;
    specialEducation?: boolean;
    therapy?: therapy[];
    otherTherapy?: string;
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
