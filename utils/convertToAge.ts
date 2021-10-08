/**
 * Get the age of a date in the past
 * @param date the date we want the age of
 * @returns the corresponding age of the date
 */
export default function convertToAge(date: Date): number {
    const timeDiff = Date.now() - date.getTime();
    const ageDate = new Date(timeDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
