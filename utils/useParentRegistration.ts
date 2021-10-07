import { EnrollmentCardInfo } from "@models/Enroll";
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
 */
export default function useParentRegistrations(): useParentRegistrationsResponse {
    const { data, error } = useSWR("/api/enroll/child", fetcher);
    const result = data ? CardInfoUtil.getEnrollmentCardInfos(data.data) : [];
    return {
        enrollments: result,
        isLoading: !error && !data,
        error: error,
    };
}
