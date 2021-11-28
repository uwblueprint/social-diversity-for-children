import { ParentReg, Student, User, Volunteer, VolunteerReg } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "../fetcher";

export type UseClassRegistrantResponse = {
    studentRegs: (ParentReg & { student: Student })[];
    volunteerRegs: (VolunteerReg & { volunteer: Volunteer & { user: User } })[];
    isLoading: boolean;
    error: any;
};

/**
 * use Class Registrant hook to get class registrants (volunteer + students)
 * @param  {string} classId class id
 * @returns UseClassRegistrantResponse
 */
export default function useClassRegistrant(
    classId: number,
): UseClassRegistrantResponse {
    const { data, error } = useSWR(`/api/class/registrant/${classId}`, fetcher);
    return {
        studentRegs: data?.data?.parentRegs,
        volunteerRegs: data?.data?.volunteerRegs,
        isLoading: !error && !data,
        error: error,
    };
}
