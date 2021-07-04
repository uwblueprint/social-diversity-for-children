import type { roles, province, locale } from "@prisma/client";

export type UserInput = {
    id: string;
    firstName?: string;
    lastName?: string;
    role?: roles;
    roleData?: ParentInput | ProgramAdminInput | VolunteerInput;
};

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

export type ProgramAdminInput = {
    id: string;
};

// TODO: not for MVP
export type TeacherInput = {
    id: string;
};
