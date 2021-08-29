/**
 * Helper function to get the hour of a date in 12 hour format
 * @param d date object from DB
 * @returns the start time of a class (hour)
 */
export default function getHours(d: Date): string {
    return new Date(d)
        .toLocaleDateString("en-US", { hour: "numeric", hour12: true })
        .split(",")[1];
}

export function getSimpleDate(d: Date): string {
    return new Date(d).toDateString();
}
