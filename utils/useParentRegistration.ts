import { EnrollmentCardInfo } from "@models/Enroll";
import { locale } from "@prisma/client";
import useSWR from "swr";
import CardInfoUtil from "./cardInfoUtil";
import fetcher from "./fetcher";

export type useParentRegistrationsResponse = {
    enrollments: EnrollmentCardInfo[];
    isLoading: boolean;
    error: any;
};

/**
 * Parent registrations hook to get all of current parent registrations
 * @param language locale used
 */
export default function useParentRegistrations(
    language: locale,
): useParentRegistrationsResponse {
    const { data, error } = useSWR("/api/enroll/child", fetcher);
    const result = data
        ? CardInfoUtil.getEnrollmentCardInfos(data.data, language)
        : [];
    return {
        enrollments: result,
        isLoading: !error && !data,
        error: error,
    };
}
