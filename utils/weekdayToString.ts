import { weekday } from "@prisma/client";

/**
 * Method for returning the corresponding string given a Weekday enum
 * @param wd the Weekday enum value
 */
export default function weekdayToString(wd: weekday): string {
    switch (wd) {
        case weekday.MON:
            return "Monday";
        case weekday.TUE:
            return "Tuesday";
        case weekday.WED:
            return "Wednesday";
        case weekday.THU:
            return "Thursday";
        case weekday.FRI:
            return "Friday";
        case weekday.SAT:
            return "Saturday";
        case weekday.SUN:
            return "Sunday";
    }
    return "Invalid weekday";
}
