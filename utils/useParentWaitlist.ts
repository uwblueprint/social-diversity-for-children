import { WaitlistCardInfo } from "@models/Enroll";
import { locale } from "@prisma/client";
import useSWR from "swr";
import CardInfoUtil from "./cardInfoUtil";
import { fetcher } from "./fetcher";

export type UseParentWaitlistResponse = {
    waitlist: WaitlistCardInfo[];
    isLoading: boolean;
    error: any;
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * Parent registrations hook to get all of current parent waitlist
 * @param language locale used
 */
export default function useParentWaitlist(
    language: locale,
): UseParentWaitlistResponse {
    const { data, error, mutate } = useSWR("/api/waitlist", fetcher); // ????
    const result = data
        ? CardInfoUtil.getWaitlistCardInfos(data.data, language)
        : [];
    return {
        waitlist: result,
        isLoading: !error && !data,
        error,
        mutate,
    };
}
