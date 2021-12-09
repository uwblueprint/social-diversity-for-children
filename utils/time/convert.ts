/**
 * totalMinutes gets the total minutes of a time in a date, counting hours in minutes
 * @param  {Date} date
 * @returns number
 */
export function totalMinutes(date: Date): number {
    return date.getMinutes() + date.getHours() * 60;
}

/**
 * totalUTCMinutes gets the total minutes of a time in a date in UTC
 * @param  {Date} date
 * @returns number
 */
export function totalUTCMinutes(date: Date): number {
    return date.getUTCMinutes() + date.getUTCHours() * 60;
}
