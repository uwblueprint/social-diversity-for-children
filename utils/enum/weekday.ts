import { locale, weekday } from "@prisma/client";
import moment from "moment";

/**
 * Method for returning the corresponding string given a Weekday enum
 * @param wd the Weekday enum value
 * @param language locale used
 */
export function weekdayToString(
    wd: weekday,
    language: locale = locale.en,
): string {
    const getLocaleWeekday = (day: number) =>
        moment()
            .day(day)
            .toDate()
            .toLocaleDateString(language, { weekday: "long" });

    switch (wd) {
        case weekday.MON:
            return getLocaleWeekday(1);
        case weekday.TUE:
            return getLocaleWeekday(2);
        case weekday.WED:
            return getLocaleWeekday(3);
        case weekday.THU:
            return getLocaleWeekday(4);
        case weekday.FRI:
            return getLocaleWeekday(5);
        case weekday.SAT:
            return getLocaleWeekday(6);
        case weekday.SUN:
            return getLocaleWeekday(7);
        default:
            return "Invalid weekday";
    }
}
