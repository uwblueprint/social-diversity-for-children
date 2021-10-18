import useSWR from "swr";
import fetcher from "./fetcher";

export type UseGetZoomLinkResponse = {
    link: string;
    isLoading: boolean;
    error: any;
};

/**
 * Me hook to get data about current user
 */
export default function useGetZoomLink(): UseGetZoomLinkResponse {
    const { data, error } = useSWR("/api/class/join-class", fetcher);
    return {
        link: data ? data.data : null,
        isLoading: !error && !data,
        error: error,
    };
}
