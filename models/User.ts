import type { roles, province, locale } from "@prisma/client";

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
