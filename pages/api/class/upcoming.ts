import { NextApiRequest, NextApiResponse } from "next";
import { ResponseUtil } from "@utils/responseUtil";
import { getWeeklySortedClasses } from "@database/class";
import { dateToWeekday, weekdayToDay } from "@utils/enum/weekday";

/**
 * handle controls the request made to the class resource
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    switch (req.method) {
        case "GET": {
            let classes = await getWeeklySortedClasses();
            const today = new Date();
            const todayWeekday = dateToWeekday(today);
            const currentTimeInMinute =
                today.getHours() * 60 + today.getMinutes();
            let hasLive = false;

            // Filter classes that is further in the week or has not ended yet
            classes = classes.filter((c) => {
                const classDay = weekdayToDay(c.weekday);
                const todayDay = weekdayToDay(todayWeekday);

                if (classDay > todayDay) {
                    return true;
                } else if (
                    classDay === todayDay &&
                    currentTimeInMinute < c.startTimeMinutes + c.durationMinutes
                ) {
                    hasLive = true;
                    return true;
                } else {
                    return false;
                }
            });

            ResponseUtil.returnOK(res, { classes, hasLive });
            break;
        }
        default: {
            const allowedHeaders: string[] = ["GET"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
}
