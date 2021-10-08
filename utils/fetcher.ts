import { locale } from "@prisma/client";

/**
 * Generic fetcher
 * @param url route to call fetch
 * @returns the promise corresponding to the response of the route
 */
export default function fetcher(
    url: string,
    language: locale = locale.en,
): Promise<any> {
    return fetch(`${url}?lang=${language}`).then((r) => r.json());
}
