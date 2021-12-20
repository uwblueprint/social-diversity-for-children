import { locale } from "@prisma/client";

/**
 * Method for converting the corresponding short date string given the date
 * @param date The date to convert
 * @param language locale used
 * @param withYear include year in string, defaults to true
 * @returns the corresponding short date string
 */
export default function convertToShortDateString(
    date: Date,
    language: locale = locale.en,
    withYear?: boolean,
): string {
    return new Date(date).toLocaleDateString(language, {
        month: "long",
        day: "2-digit",

        year: withYear === false ? undefined : "numeric",
    });
}
