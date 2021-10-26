import useSWR from "swr";
import { fetcher } from "./fetcher";

export type UseGetZoomLinkResponse = {
    link: string;
    isLoading: boolean;
    error: any;
};

/**
 * Zoom link hook to get class Zoom link
 */
export default function useGetZoomLink(): UseGetZoomLinkResponse {
    const { data, error } = useSWR("/api/class/meeting", fetcher);
    return {
        link: data ? data.data : null,
        isLoading: !error && !data,
        error: error,
    };
}
