import { locale } from "@prisma/client";

/**
 * Generic fetcher with id
 * @param url route to call fetch
 * @returns the promise corresponding to the response of the route
 */
export default function fetcherWithId(
    url: string,
    id: string,
    language: locale = locale.en,
): Promise<any> {
    return fetch(`${url}?id=${id}&lang=${language}`).then((r) => r.json());
}
