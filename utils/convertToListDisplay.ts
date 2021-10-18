/**
 * Compute a human friendly string representation of an array of string
 * @param names the array of names
 * @returns the corresponding list of names grammatically separated by commas and "and"
 */
export default function convertToListDisplay(names: string[]): string {
    if (names.length === 1) {
        return names[0];
    } else if (names.length == 2) {
        return names[0] + " and " + names[1];
    } else if (names.length > 2) {
        let result = names.slice(0, -2).join(", ");
        result += ", " + names.slice(names.length - 2).join(" and ");
        return result;
    }
    return "";
}
