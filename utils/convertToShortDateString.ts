/**
 * Method for converting the corresponding short date string given the date
 * @param date The date to convert
 * @returns the corresponding short date string
 */
export default function convertToShortDateString(date: Date): string {
    // TODO: We want to pass in the locale here as well
    return new Date(date).toLocaleDateString("en", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    });
}
