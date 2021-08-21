import type { province, locale } from "@prisma/client";
export { province, locale };

/* Input type for Parent inputs */
export type ParentInput = {
    phoneNumber: string;
    isLowIncome?: boolean;
    addressLine1: string;
    addressLine2?: string;
    postalCode: string;
    cityName: string;
    province: province;
    preferredLanguage: locale;
};

/* Input type for Volunteer inputs */
export type VolunteerInput = {
    dateOfBirth: string;
    phoneNumber: string;
    criminalRecordCheckLink?: string;
    addressLine1: string;
    postalCode: string;
    cityName: string;
    province: province;
    preferredLanguage: locale;
    school?: string;
    skills?: string;
    hearAboutUs?: string;
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
