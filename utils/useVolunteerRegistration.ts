import { VolunteeringCardInfo } from "@models/Enroll";
import useSWR from "swr";
import CardInfoUtil from "./cardInfoUtil";
import fetcher from "./fetcher";

export type useVolunteerRegistrationsResponse = {
    volunteering: VolunteeringCardInfo[];
    isLoading: boolean;
    error: any;
};

/**
 * Volunteer registrations hook to get all of current volunteer registrations
 */
export default function useVolunteerRegistrations(): useVolunteerRegistrationsResponse {
    const { data, error } = useSWR("/api/enroll/volunteer", fetcher);
    const result = data ? CardInfoUtil.getVolunteeringCardInfos(data.data) : [];
    return {
        volunteering: result,
        isLoading: !error && !data,
        error: error,
    };
}
