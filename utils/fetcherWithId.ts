/**
 * Generic fetcher with id
 * @param url route to call fetch
 * @returns the promise corresponding to the response of the route
 */
export default function fetcherWithId(url: string, id: string): Promise<any> {
    return fetch(`${url}?id=${id}`).then((r) => r.json());
}
