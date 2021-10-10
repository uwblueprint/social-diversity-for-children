import convertToShortDateString from "./convertToShortDateString";

/**
 * Get a short and concise representation of a date range
 * @param startDate the start date of range
 * @param endDate the end date of range
 * @returns a string representing a short and concise range of dates
 */
export default function convertToShortDateRange(
    startDate: Date,
    endDate: Date,
): string {
    const startString = convertToShortDateString(startDate);
    const endString = convertToShortDateString(endDate);

    if (startString.split(",")[1] === endString.split(",")[1]) {
        return startString.split(",")[0] + " to " + endString;
    }
    return startString + " to " + endString;
}
