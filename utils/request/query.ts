/**
 * Get path with additional query param at the end
 * @param  {string} path
 * @param  {string} param
 * @param  {string} value
 * @returns string of new path
 */
export function pathWithQuery(
    path: string,
    param: string,
    value: string,
): string {
    if (path.includes("?")) {
        return `${path}&${param}=${value}`;
    } else {
        return `${path}?${param}=${value}`;
    }
}
