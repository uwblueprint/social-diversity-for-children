import useSWR from "swr";
import { fetcherWithPathFile } from "./fetcher";

export type UseFileRetrieveResponse = {
    url: string;
    isLoading: boolean;
    error: any;
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * File retrieve hook to get url to download file in bucket
 */
export default function useFileRetrieve(
    path?: string,
    file?: string,
): UseFileRetrieveResponse {
    const { data, error, mutate } = useSWR(
        ["/api/file/retrieve", path, file],
        fetcherWithPathFile,
    );
    return {
        url: data ? data.data : null,
        isLoading: !error && !data,
        error,
        mutate,
    };
}
