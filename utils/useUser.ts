import useSWR from "swr";
import fetcher from "./fetcher";

export default function useUser(id: string): any {
    const { data, error } = useSWR(`/api/user/${id}`, fetcher);
    return {
        user: data ? data.data : null,
        isLoading: !error && !data,
        error: error,
    };
}
