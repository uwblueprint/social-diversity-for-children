import { locale, weekday } from "@prisma/client";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import { weekdayToString } from "@utils/enum/weekday";

/**
 * Return html representing the waitlist notification template
 * @param  {number} classId class id
 * @param  {string} imageLink image link of class
 * @param  {string} name name of class
 * @param  {weekday} classWeekday repeated weekday of class
 * @param  {Date} startDate date which class starts
 * @param  {Date} endDate date which class ends
 * @param  {number} startTimeMinutes starting time in minutes
 * @param  {number} durationMinutes duration of session
 * @return {string} html template
 */

export const openSpotWaitlistTemplate = (
    classId: number,
    imageLink: string,
    name: string,
    classWeekday: weekday,
    startDate: Date,
    endDate: Date,
    startTimeMinutes: number,
    durationMinutes: number,
    language: locale = locale.en,
): string => {
    const { start, end } = convertToShortDateRange(startDate, endDate, language);

    return `
            <head>
                <link
                    href="https://fonts.googleapis.com/css?family=Poppins"
                    rel="stylesheet"
                    />
                <style>
                    body {
                    font-family: "Poppins";
                    }
                </style>
            </head>
            <body style="background-color: #fff; padding: 30px; position: absolute">
                <p style="font-size: 30px"><img src=https://images.squarespace-cdn.com/content/5e83092341f99d6d384777ef/1592547010897-WF00319AKLJCVGJZC3ZK/sdc+logo+with+name+alt.png?content-type=image%2Fpng
                    style="width: 250px; padding-bottom: 10px; color: #0c53a0" alt="SDC Logo"/></p>
                <span style="font-style: normal;
                    font-weight: bold;
                    font-size: 24px;
                    line-height: 36px;">A spot is available for ${name}!</span>
                <p style="font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 24px;">This is an automatic notification for waitlisted users of the following class:</p>
                <div style="display: flex; flex-direction: row">
                    <div
                        style="
                            width: 100px;
                            height: 100px;
                            background: url('${imageLink}');
                            display: flex;
                            background-size: cover;
                        "
                    ></div>
                    <div style="padding-left: 10px">
                        <span style="width: 375px; font-weight: Bold; font-size: 16px"
                            >${name}</span
                        ><br /><span
                            style="width: 30px; color: rgba(115, 115, 115, 1); font-size: 14px"
                            >${weekdayToString(classWeekday, language)} ${convertToShortTimeRange(
        startTimeMinutes,
        durationMinutes,
    )}</span
                        ><br /><span
                            style="width: 30px; color: rgba(115, 115, 115, 1); font-size: 14px"
                        >${start} to ${end} 
                        </span>
                    </div>
                </div>
                <p style="font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 24px;">Please note that registration is first come, first serve.</p>
                <br></br>
                <p>Use this link to register for the class:</p>
                <a href="${process.env.NEXTAUTH_URL}/program-details/${classId}">${
        process.env.NEXTAUTH_URL
    }/program-details/${classId}</a>
                <br></br>
                <br></br>
                <p>Use this link to remove yourself from the class waitlist:</p>
                <a href="${process.env.NEXTAUTH_URL}/class">${process.env.NEXTAUTH_URL}/class</a>
                <br></br>
                <br></br>
                <p>Regards, Social Diversity for Children</p>
            </body>
            `;
};
