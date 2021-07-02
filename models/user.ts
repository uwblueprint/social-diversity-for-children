import { ParentInput } from "models/parent";
import { ProgramAdminInput } from "models/programadmin";
import { VolunteerInput } from "models/volunteer";
import type { roles } from "@prisma/client";

export type UserInput = {
    id: string;
    first_name: string;
    last_name: string;
    role: roles | string;
    role_data: ParentInput | ProgramAdminInput | VolunteerInput;
};
