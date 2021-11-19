import { ProgramCardInfo } from "@models/Program";
import { locale } from "@prisma/client";
import useSWR from "swr";
import CardInfoUtil from "../cardInfoUtil";
import { fetcher } from "../fetcher";

export type UseProgramResponse = {
    program: ProgramCardInfo;
    isLoading: boolean;
    error: any;
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * Programs hook to get all programs in the platform
 * @param  {number} id id of class
 * @param  {locale} language locale used
 * @returns UseProgramsResponse
 */
export default function useProgram(
    id: number,
    language: locale,
): UseProgramResponse {
    const { data, error, mutate } = useSWR(`/api/program/${id}`, fetcher);
    const result = data
        ? CardInfoUtil.getProgramCardInfo(data.data, language)
        : null;
    return {
        program: result,
        isLoading: !error && !data,
        error,
        mutate,
    };
}
