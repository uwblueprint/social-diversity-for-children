import { User } from "@prisma/client";
import useSWR from "swr";
import fetcher from "./fetcher";

export type useMeResponse = {
    me: User;
    isLoading: boolean;
    error: any;
};

/**
 * Me hook to get data about current user
 */
export default function useMe(): useMeResponse {
    const { data, error } = useSWR("/api/user/me", fetcher);
    return {
        me: data ? data.data : null,
        isLoading: !error && !data,
        error: error,
    };
}
