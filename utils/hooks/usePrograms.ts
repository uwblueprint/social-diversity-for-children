import { ProgramCardInfo } from "@models/Program";
import { locale } from "@prisma/client";
import useSWR from "swr";
import CardInfoUtil from "../cardInfoUtil";
import { fetcherWithQuery } from "../fetcher";

export type UseProgramsResponse = {
    programs: ProgramCardInfo[];
    isLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * Programs hook to get all programs in the platform
 * @param  {locale} language locale used
 * @param  {boolean} isArchived to get archived items instead
 * @returns UseProgramsResponse
 */
export default function usePrograms(
    language: locale,
    isArchived = false,
): UseProgramsResponse {
    const { data, error, mutate } = useSWR(
        ["/api/program/", isArchived, "archived"],
        fetcherWithQuery,
    );
    const result = data
        ? CardInfoUtil.getProgramCardInfos(data.data, language)
        : [];
    return {
        programs: result,
        isLoading: !error && !data,
        error,
        mutate,
    };
}
