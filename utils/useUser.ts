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

export type UseUserResponse = {
    user: User & {
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

export default function useUser(id: string): UseUserResponse {
    const { data, error, mutate } = useSWR(`/api/user/${id}`, fetcher);
    return {
        user: data ? data.data : null,
        isLoading: !error && !data,
        error,
        mutate,
    };
}
