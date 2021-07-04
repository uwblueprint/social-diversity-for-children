import { ParentInput } from "models/Parent";
import { ProgramAdminInput } from "models/ProgramAdmin";
import { VolunteerInput } from "./Volunteer";
import type { roles } from "@prisma/client";

export type UserInput = {
    id: string;
    firstName?: string;
    lastName?: string;
    role?: roles;
    roleData?: ParentInput | ProgramAdminInput | VolunteerInput;
};
