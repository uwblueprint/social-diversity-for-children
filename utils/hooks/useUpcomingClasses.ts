import { ClassCardInfo } from "@models/Class";
import { locale } from "@prisma/client";
import useSWR from "swr";
import CardInfoUtil from "../cardInfoUtil";
import { fetcher } from "../fetcher";

export type UseUpcomingClassesResponse = {
    liveClass?: ClassCardInfo;
    upcomingClasses: ClassCardInfo[];
    isLoading: boolean;
    error: any;
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * Upcoming classes hook to get all of upcoming class registrations
 * @param  {locale} language locale used
 */
export default function useUpcomingClasses(language: locale): UseUpcomingClassesResponse {
    const { data, error, mutate } = useSWR("/api/class/upcoming", fetcher);
    const liveClass =
        data && data.data && data.data.liveClass
            ? CardInfoUtil.getClassCardInfo(data.data.liveClass, language)
            : null;
    const upcomingClasses =
        data && data.data
            ? CardInfoUtil.getClassCardInfos(data.data.upcomingClasses, language)
            : [];
    return {
        liveClass,
        upcomingClasses,
        isLoading: !error && !data,
        error,
        mutate,
    };
}
