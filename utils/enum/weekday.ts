import { locale, weekday } from "@prisma/client";
import moment from "moment";

/**
 * Method for returning the corresponding string given a Weekday enum
 * @param wd the Weekday enum value
 * @param language locale used
 */
export function weekdayToString(wd: weekday, language: locale = locale.en): string {
    const getLocaleWeekday = (day: number) =>
        moment().day(day).toDate().toLocaleDateString(language, { weekday: "long" });

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
/**
 * Method for returning weekday enum given date
 * @param  {Date} date
 * @returns weekday
 */
export function dateToWeekday(date: Date): weekday {
    switch (date.getDay()) {
        case 0:
            return weekday.SUN;
        case 1:
            return weekday.MON;
        case 2:
            return weekday.TUE;
        case 3:
            return weekday.WED;
        case 4:
            return weekday.THU;
        case 5:
            return weekday.FRI;
        case 6:
            return weekday.SAT;
        default:
            return weekday.MON;
    }
}

export function weekdayToDay(wd: weekday): number {
    switch (wd) {
        case weekday.MON:
            return 1;
        case weekday.TUE:
            return 2;
        case weekday.WED:
            return 3;
        case weekday.THU:
            return 4;
        case weekday.FRI:
            return 5;
        case weekday.SAT:
            return 6;
        case weekday.SUN:
            return 7;
        default:
            return 0;
    }
}
