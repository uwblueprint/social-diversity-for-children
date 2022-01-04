/**
 * Converts camel case string into normal text
 * EG: "inPerson" -> "In Person"
 * @param text Camel case text
 * @returns the corresponding normal text with proper spacing
 */
export default function convertCamelToText(text: string): string {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}
