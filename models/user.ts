import { ParentInput } from "models/parent";
import { ProgramAdminInput } from "models/programadmin";
import { VolunteerInput } from "models/volunteer";
import type { roles } from "@prisma/client";

export type UserInput = {
    id: string;
    firstName?: string;
    lastName?: string;
    role?: roles;
    roleData?: ParentInput | ProgramAdminInput | VolunteerInput;
};
