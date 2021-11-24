/**
 * Generic fetcher
 * @param url route to call fetch
 * @returns the promise corresponding to the response of the route
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fetcher(url: string): Promise<any> {
    return fetch(url).then(async (r) => {
        if (!r.ok) {
            const error = new Error();
            error.message = `${r.status}: ${await r
                .json()
                .then((data) => data.error)}`;
            throw error;
        }
        return await r.json();
    });
}

/**
 * Generic fetcher with id
 * @param url route to call fetch
 * @param id id of dyanmic route
 * @param label label of id field, default is "id"
 * @returns the promise corresponding to the response of the route
 */
export function fetcherWithId(
    url: string,
    id: string,
    label = "id",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
    return fetcher(`${url}?${label}=${id}`);
}

/**
 * Generic fetcher with file and path for S3 APIs
 * @param  {string} url
 * @param  {string} path
 * @param  {string} file
 * @param  {string} email
 * @returns the promise corresponding to the response of the route
 */
export function fetcherWithPathFile(
    url: string,
    path?: string,
    file?: string,
    email?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
    let endpoint = `${url}?`;
    if (path) endpoint += `path=${path}&`;
    if (file) endpoint += `file=${file}&`;
    if (email) endpoint += `email=${encodeURIComponent(email)}&`;
    console.log(encodeURIComponent(email));
    return fetcher(endpoint.slice(0, -1));
}
