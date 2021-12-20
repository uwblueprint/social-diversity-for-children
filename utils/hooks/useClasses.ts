import { ClassCardInfo } from "@models/Class";
import { locale } from "@prisma/client";
import CardInfoUtil from "@utils/cardInfoUtil";
import useSWR from "swr";
import { fetcherWithQuery } from "../fetcher";

export type UseClassesResponse = {
    classCards: ClassCardInfo[];
    isLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * use Classes hook to get all classes
 * @param  {locale} language language of class translation to get
 * @param {boolean} isArchived - whether to search for archived classes
 * @returns UseClassesByProgramResponse
 */
export default function useClasses(language: locale, isArchived = false): UseClassesResponse {
    const { data, error, mutate } = useSWR(
        ["/api/class", isArchived, "archived"],
        fetcherWithQuery,
    );
    const classCards = data ? CardInfoUtil.getClassCardInfos(data.data, language) : [];
    return {
        classCards,
        isLoading: !error && !data,
        error: error,
        mutate,
    };
}
