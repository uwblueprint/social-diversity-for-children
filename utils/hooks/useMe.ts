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
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * Me hook to get data about current user
 */
export default function useMe(): UseMeResponse {
    const { data, error, mutate } = useSWR("/api/user/me", fetcher);
    return {
        me: data ? data.data : null,
        isLoading: !error && !data,
        error,
        mutate,
    };
}
