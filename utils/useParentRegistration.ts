import useSWR from "swr";
import fetcher from "./fetcher";

/**
 * Parent registrations hook to get all of current parent registrations
 */
export default function useParentRegistrations() {
    const { data, error } = useSWR("/api/enroll/child", fetcher);
    return {
        enrollments: data,
        isLoading: !error && !data,
        error: error,
    };
}
