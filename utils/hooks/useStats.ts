import useSWR from "swr";
import { fetcher } from "../fetcher";

export type UseStatsResponse = {
    totalRegistrants: number;
    totalPrograms: number;
    totalClasses: number;
    totalTeachers: number;
    isLoading: boolean;
    error: any;
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};
/**
 * Use hook for getting stats for admin dashboard
 * @returns UseStatsResponse
 */
export default function useStats(): UseStatsResponse {
    const { data, error, mutate } = useSWR("/api/admin/stats", fetcher);
    return {
        totalRegistrants: data && data.data ? data.data.totalRegistrants : null,
        totalPrograms: data && data.data ? data.data.totalPrograms : null,
        totalClasses: data && data.data ? data.data.totalClasses : null,
        totalTeachers: data && data.data ? data.data.totalTeachers : null,
        isLoading: !error && !data,
        error,
        mutate,
    };
}
