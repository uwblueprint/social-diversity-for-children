/**
 * Method for converting the corresponding short date string given the date
 * @param date The date to convert
 * @returns the corresponding short date string
 */
export default function dateToShortDateString(date: Date): string {
    return new Date(date).toDateString().split(" ").slice(1).join(" ");
}
