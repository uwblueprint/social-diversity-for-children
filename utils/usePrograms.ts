import { ProgramCardInfo } from "@models/Program";
import useSWR from "swr";
import CardInfoUtil from "./cardInfoUtil";
import fetcher from "./fetcher";

export type UseProgramsResponse = {
    programs: ProgramCardInfo[];
    isLoading: boolean;
    error: any;
};

/**
 * Parent registrations hook to get all of current parent registrations
 */
export default function usePrograms(): UseProgramsResponse {
    const { data, error } = useSWR("/api/program", fetcher);
    const result = data ? CardInfoUtil.getProgramCardInfos(data.data) : [];
    return {
        programs: result,
        isLoading: !error && !data,
        error: error,
    };
}
