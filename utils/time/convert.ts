/**
 * totalMinutes gets the total minutes of a time in a date, counting hours in minutes
 * @param  {Date} date
 * @returns number
 */
export function totalMinutes(date: Date): number {
    return date.getMinutes() + date.getHours() * 60;
}
