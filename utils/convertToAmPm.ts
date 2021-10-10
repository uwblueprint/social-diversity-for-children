/**
 * Time in minutes is minutes from 0:00, convert to something like "1:23 am"
 * @param timeInMinutes the minutes to convert
 * @returns the corresponding time string (AM/PM)
 */
export default function convertToAmPm(timeInMinutes: number): string {
    return (
        (Math.floor(timeInMinutes / 60) % 12 === 0
            ? 12
            : Math.floor(timeInMinutes / 60) % 12
        ).toString() +
        ":" +
        ("0" + (timeInMinutes % 60)).slice(-2) +
        (timeInMinutes >= 720 ? "pm" : "am")
    );
}
