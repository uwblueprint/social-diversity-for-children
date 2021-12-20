import { ClassCardInfo } from "@models/Class";
import { locale } from "@prisma/client";
import CardInfoUtil from "@utils/cardInfoUtil";
import useSWR from "swr";
import { fetcherWithQuery } from "../fetcher";

export type UseClassResponse = {
    classCard: ClassCardInfo;
    isLoading: boolean;
    error: any;
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * use Class hook to get class info given id
 * @param  {string} id class id
 * @param  {locale} language language of class translation to get
 * @param  {boolean} includeArchived whether or not to include archived class (admin only)
 * @returns UseClassResponse
 */
export default function useClass(
    id: string,
    language: locale,
    includeArchived = false,
): UseClassResponse {
    const { data, error, mutate } = useSWR(
        [`/api/class/${id}`, includeArchived, "includeArchived"],
        fetcherWithQuery,
    );
    const classCard = data?.data ? CardInfoUtil.getClassCardInfo(data.data, language) : null;
    return {
        classCard,
        isLoading: !error && !data,
        error: error,
        mutate,
    };
}
