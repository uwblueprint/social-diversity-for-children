import { ClassCardInfo } from "@models/Class";
import { locale } from "@prisma/client";
import CardInfoUtil from "@utils/cardInfoUtil";
import useSWR from "swr";
import { fetcherWithId } from "../fetcher";

export type UseClassesByProgramResponse = {
    classCards: ClassCardInfo[];
    isLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * use Classes by program hook to get classes of a program
 * @param  {number} pid program id
 * @param  {locale} language language of class translation to get
 * @returns UseClassesByProgramResponse
 */
export default function useClassesByProgram(
    pid: string,
    language: locale,
): UseClassesByProgramResponse {
    const { data, error, mutate } = useSWR(["/api/class", pid], fetcherWithId);
    const classCards = data
        ? CardInfoUtil.getClassCardInfos(data.data, language)
        : [];
    return {
        classCards,
        isLoading: !error && !data,
        error: error,
        mutate,
    };
}
