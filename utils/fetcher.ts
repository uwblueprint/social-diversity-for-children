/**
 * Generic fetcher
 * @param url route to call fetch
 * @returns the promise corresponding to the response of the route
 */
export default function fetcher(url: string): Promise<any> {
    return fetch(url).then((r) => r.json());
}
