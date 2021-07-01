import { ParentInput } from "models/parent";
import { ProgramAdminInput } from "models/programadmin";
import { VolunteerInput } from "models/volunteer";

export type UserInput = {
    id: string;
    first_name: string;
    last_name: string;
    role: string;
    role_data: ParentInput | ProgramAdminInput | VolunteerInput;
};
