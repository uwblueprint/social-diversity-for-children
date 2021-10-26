import {
    roles,
    province,
    locale,
    difficulties,
    therapy,
    heardFrom,
} from "@prisma/client";
import { CreateStudentInput } from "@models/Student";

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
    createStudentInput?: CreateStudentInput;
};

/* Input type for Volunteer inputs */
export type VolunteerInput = {
    dateOfBirth: Date;
    phoneNumber: string;
    criminalRecordCheckLink?: string;
    criminalCheckApproved?: boolean;
    criminalCheckExpired?: boolean;
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
