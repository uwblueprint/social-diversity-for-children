import { ProgramCardInfo } from "@models/Program";
import { locale } from "@prisma/client";
import useSWR from "swr";
import CardInfoUtil from "../cardInfoUtil";
import { fetcherWithQuery } from "../fetcher";

export type UseProgramResponse = {
    program: ProgramCardInfo;
    isLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * Programs hook to get all programs in the platform
 * @param  {number} id id of class
 * @param  {locale} language locale used
 * @param  {boolean} isArchived to get archived items instead
 * @returns UseProgramsResponse
 */
export default function useProgram(
    id: number,
    language: locale,
    isArchived = false,
): UseProgramResponse {
    const { data, error, mutate } = useSWR(
        [`/api/program/${id}`, isArchived, "archived"],
        fetcherWithQuery,
    );
    const result = data ? CardInfoUtil.getProgramCardInfo(data.data, language) : null;

    return {
        program: result,
        isLoading: !error && !data,
        error,
        mutate,
    };
}
