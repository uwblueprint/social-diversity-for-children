/*
 * @param d a Date
 * @return string representing a date in format YYYY-MM-DD
 */

export default function parseDate(d: Date): string {
    return d.toISOString().slice(0, 10);
}
