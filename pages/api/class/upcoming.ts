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
            const currentTimeInMinute = today.getHours() * 60 + today.getMinutes();
            const todayDay = weekdayToDay(todayWeekday);
            let hasLive = false;

            // Filter classes that is further in the week or has not ended yet
            classes = classes.filter((c) => {
                const classDay = weekdayToDay(c.weekday);

                if (classDay > todayDay) {
                    return true;
                } else if (
                    classDay === todayDay &&
                    currentTimeInMinute >= c.startTimeMinutes &&
                    currentTimeInMinute < c.startTimeMinutes + c.durationMinutes
                ) {
                    hasLive = true;
                    return true;
                } else if (todayDay >= 6) {
                    // If today is the weekend, we include the classes for the next weekdays
                    return true;
                } else {
                    return false;
                }
            });

            // If today is the weekend, we include the classes for the next weekdays
            if (todayDay >= 6) {
                let index = classes.length;

                classes.some((c, i) => {
                    const classDay = weekdayToDay(c.weekday);
                    if (
                        classDay > todayDay ||
                        (classDay === todayDay &&
                            currentTimeInMinute < c.startTimeMinutes + c.durationMinutes)
                    ) {
                        index = i;
                        return true;
                    }
                });
                const head = classes.slice(index);
                classes = classes.slice(0, index);
                classes.unshift(...head);
            }

            // Assume there is only 1 live class at all times
            const liveClass = hasLive ? classes[0] : null;
            const upcomingClasses = hasLive ? classes.slice(1) : classes;

            ResponseUtil.returnOK(res, { liveClass, upcomingClasses });
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
