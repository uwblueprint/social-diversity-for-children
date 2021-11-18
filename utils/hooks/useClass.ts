import { ClassCardInfo } from "@models/Class";
import { locale } from "@prisma/client";
import CardInfoUtil from "@utils/cardInfoUtil";
import useSWR from "swr";
import { fetcher } from "../fetcher";

export type UseClassResponse = {
    classCard: ClassCardInfo;
    isLoading: boolean;
    error: any;
};

/**
 * use Class hook to get class info given id
 * @param  {string} id class id
 * @param  {locale} language language of class translation to get
 * @returns UseClassResponse
 */
export default function useClass(
    id: string,
    language: locale,
): UseClassResponse {
    const { data, error } = useSWR(`/api/class/${id}`, fetcher);
    const classCard = data?.data
        ? CardInfoUtil.getClassCardInfo(data.data, language)
        : null;
    return {
        classCard,
        isLoading: !error && !data,
        error: error,
    };
}
