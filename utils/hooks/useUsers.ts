import {
    Parent,
    ProgramAdmin,
    Student,
    Teacher,
    User,
    Volunteer,
} from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "../fetcher";

export type UseUsersResponse = {
    parents: (User & {
        parent: Parent & {
            students: Student[];
        };
    })[];
    volunteers: (User & {
        volunteer: Volunteer;
    })[];
    teachers: (User & {
        teacher: Teacher & {
            _count: {
                teacherRegs: number;
            };
        };
    })[];
    programAdmins: (User & {
        programAdmins: ProgramAdmin;
    })[];
    students: Student[];
    isLoading: boolean;
    error: any;
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * use users hook to get all users via admin access
 * @returns UseUsersResponse
 */
export default function useUsers(): UseUsersResponse {
    const { data, error, mutate } = useSWR("/api/user", fetcher);

    const parents = data?.data?.filter((user) => user.parent !== null);
    const volunteers = data?.data?.filter((user) => user.volunteer !== null);
    const teachers = data?.data?.filter((user) => user.teacher !== null);
    const programAdmins = data?.data?.filter(
        (user) => user.programAdmin !== null,
    );
    const students = [].concat(
        ...(parents?.map((user) => user.parent.students) || []),
    );

    return {
        parents,
        students,
        volunteers,
        teachers,
        programAdmins,
        isLoading: !error && !data,
        error,
        mutate,
    };
}
