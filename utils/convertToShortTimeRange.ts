import convertToAmPm from "./convertToAmPm";

/**
 * Get a short and concise representation of a time range
 * @param startTimeMinutes the time in minutes when range starts
 * @param durationMinutes the minutes the range last
 * @returns a string representing a short and concise from of the range
 */
export default function convertToShortTimeRange(
    startTimeMinutes: number,
    durationMinutes: number,
): string {
    const startTime = convertToAmPm(startTimeMinutes);
    const endTime = convertToAmPm(startTimeMinutes + durationMinutes);

    if (startTime.substr(-2, 2) === endTime.substr(-2, 2)) {
        return startTime.slice(0, -2) + " - " + endTime;
    }
    return startTime + " - " + endTime;
}
