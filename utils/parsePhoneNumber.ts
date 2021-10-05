/*
 * @param s a string is in the format ##########
 * @return phoneNUmber a string in the format ###-###-####
 */

export default function parsePhoneNumber(s: string) {
    return s.slice(0, 3) + "-" + s.slice(3, 6) + "-" + s.slice(6, 10);
}
