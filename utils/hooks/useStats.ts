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
        totalRegistrants: data?.data?.totalRegistrants,
        totalPrograms: data?.data?.totalPrograms,
        totalClasses: data?.data?.totalClasses,
        totalTeachers: data?.data?.totalTeachers,
        isLoading: !error && !data,
        error,
        mutate,
    };
}
