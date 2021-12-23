import { ProgramCardInfo } from "@models/Program";
import { locale } from "@prisma/client";
import useSWR from "swr";
import CardInfoUtil from "../cardInfoUtil";
import { fetcherWithQuery } from "../fetcher";

export type UseProgramIncludeArchivedResponse = {
    program: ProgramCardInfo;
    isLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * ProgramIncludeArchived hook to get a program regardless it is archived or not
 * @param  {number} id id of class
 * @param  {locale} language locale used
 * @param  {boolean} includeArchived to get archived item as well
 * @returns UseProgramsResponse
 */
export default function useProgramIncludeArchived(
    id: number,
    language: locale,
    includeArchived = true,
): UseProgramIncludeArchivedResponse {
    const { data, error, mutate } = useSWR(
        [`/api/program/${id}`, includeArchived, "includeArchived"],
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
