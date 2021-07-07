import type { roles, province, locale } from "@prisma/client";

/* Input type for Parent inputs */
export type ParentInput = {
    id: string;
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
    id: string;
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
export type ProgramAdminInput = {
    id: string;
};

// TODO: not for MVP
type TeacherInput = {
    id: string;
};

/* Input type for User endpoints */
export type UserInput = {
    id: string;
    firstName?: string;
    lastName?: string;
    role?: roles;
    roleData?: ParentInput | ProgramAdminInput | VolunteerInput;
};
