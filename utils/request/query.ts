/**
 * Get path with additional query params at the end
 * @param  {string} path
 * @param  {{param:string;value:string}[]} queries
 * @returns string of new path
 */
export function pathWithQueries(
    path: string,
    queries: { param: string; value: string }[],
): string {
    let result = path;
    queries.forEach(({ param, value }) => {
        result = pathWithQuery(result, param, value);
    });
    return result;
}

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
    const re = new RegExp("([?&])" + param + "=.*?(&|$)", "i");
    const separator = path.indexOf("?") !== -1 ? "&" : "?";
    if (path.match(re)) {
        return path.replace(re, "$1" + param + "=" + value + "$2");
    } else {
        return path + separator + param + "=" + value;
    }
}
