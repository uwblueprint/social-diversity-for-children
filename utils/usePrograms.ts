import { ProgramCardInfo } from "@models/Program";
import { locale } from "@prisma/client";
import useSWR from "swr";
import CardInfoUtil from "./cardInfoUtil";
import fetcher from "./fetcher";

export type UseProgramsResponse = {
    programs: ProgramCardInfo[];
    isLoading: boolean;
    error: any;
};

/**
 * Parent registrations hook to get all of current parent registrations
 * @param  {locale} language locale used
 * @returns UseProgramsResponse
 */
export default function usePrograms(language: locale): UseProgramsResponse {
    const { data, error } = useSWR("/api/program", fetcher);
    const result = data
        ? CardInfoUtil.getProgramCardInfos(data.data, language)
        : [];
    return {
        programs: result,
        isLoading: !error && !data,
        error: error,
    };
}
