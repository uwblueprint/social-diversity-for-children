import useSWR from "swr";
import { S3 } from "services/aws/index";
import { fetcherWithPathFile } from "../fetcher";

export type UseFileUploadResponse = {
    post: S3.PresignedPost;
    isLoading: boolean;
    error: any;
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * File upload presigned url hook to upload file
 */
export default function useFileUpload(
    path?: string,
    file?: string,
): UseFileUploadResponse {
    const { data, error, mutate } = useSWR(
        ["/api/file", path, file],
        fetcherWithPathFile,
    );
    return {
        post: data ? data.data : null,
        isLoading: !error && !data,
        error,
        mutate,
    };
}
