import { locale, weekday } from "@prisma/client";
import moment from "moment";

/**
 * Method for returning the corresponding string given a Weekday enum
 * @param wd the Weekday enum value
 * @param locale locale used
 */
export default function weekdayToString(wd: weekday, language: locale): string {
    switch (wd) {
        case weekday.MON:
            return moment()
                .day(1)
                .toDate()
                .toLocaleDateString(language, { weekday: "long" });
        case weekday.TUE:
            return moment()
                .day(2)
                .toDate()
                .toLocaleDateString(language, { weekday: "long" });
        case weekday.WED:
            return moment()
                .day(3)
                .toDate()
                .toLocaleDateString(language, { weekday: "long" });
        case weekday.THU:
            return moment()
                .day(4)
                .toDate()
                .toLocaleDateString(language, { weekday: "long" });
        case weekday.FRI:
            return moment()
                .day(5)
                .toDate()
                .toLocaleDateString(language, { weekday: "long" });
        case weekday.SAT:
            return moment()
                .day(6)
                .toDate()
                .toLocaleDateString(language, { weekday: "long" });
        case weekday.SUN:
            return moment()
                .day(7)
                .toDate()
                .toLocaleDateString(language, { weekday: "long" });
        default:
            return "Invalid weekday";
    }
}
