import { VolunteeringCardInfo } from "@models/Enroll";
import { locale } from "@prisma/client";
import useSWR from "swr";
import CardInfoUtil from "../cardInfoUtil";
import { fetcher } from "../fetcher";

export type UseVolunteerRegistrationsResponse = {
    volunteering: VolunteeringCardInfo[];
    isLoading: boolean;
    error: any;
    mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * Volunteer registrations hook to get all of current volunteer registrations
 * @param language locale used
 */
export default function useVolunteerRegistrations(
    language: locale,
): UseVolunteerRegistrationsResponse {
    const { data, error, mutate } = useSWR("/api/enroll/volunteer", fetcher);
    const result = data ? CardInfoUtil.getVolunteeringCardInfos(data.data, language) : [];
    return {
        volunteering: result,
        isLoading: !error && !data,
        error,
        mutate,
    };
}
