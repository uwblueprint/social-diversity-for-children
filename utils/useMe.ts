import {
    Parent,
    ProgramAdmin,
    Student,
    Teacher,
    User,
    Volunteer,
} from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "./fetcher";

export type UseMeResponse = {
    me: User & {
        parent: Parent & {
            students: Student[];
        };
        teacher: Teacher;
        programAdmin: ProgramAdmin;
        volunteer: Volunteer;
    };
    isLoading: boolean;
    error: any;
};

/**
 * Me hook to get data about current user
 */
export default function useMe(): UseMeResponse {
    const { data, error } = useSWR("/api/user/me", fetcher);
    return {
        me: data ? data.data : null,
        isLoading: !error && !data,
        error: error,
    };
}
