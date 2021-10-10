import { locale } from "@prisma/client";
import convertToShortDateString from "./convertToShortDateString";

type DateStringPair = {
    start: string;
    end: string;
};

/**
 * Get a short and concise representation of a date range
 * @param startDate the start date of range
 * @param endDate the end date of range
 * @param language locale used
 * @returns a pair representing a short and concise range of dates
 */
export default function convertToShortDateRange(
    startDate: Date,
    endDate: Date,
    language: locale,
): DateStringPair {
    const start = convertToShortDateString(startDate, language);
    let end;
    if (new Date(startDate).getFullYear() === new Date(endDate).getFullYear()) {
        end = convertToShortDateString(endDate, language, false);
    } else {
        end = convertToShortDateString(endDate, language);
    }

    return {
        start,
        end,
    };
}
