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
    language: locale = locale.en,
): DateStringPair {
    const end = convertToShortDateString(endDate, language);
    let start;
    if (new Date(startDate).getFullYear() === new Date(endDate).getFullYear()) {
        start = convertToShortDateString(startDate, language, false);
    } else {
        start = convertToShortDateString(startDate, language);
    }

    return {
        start,
        end,
    };
}
