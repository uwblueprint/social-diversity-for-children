/**
 * Check if date is expired (defining expired as 1 year from the date)
 * @param date the date we to check
 * @returns true if expired, false if not
 */
export default function checkExpiry(date: Date): boolean {
    const d = new Date(date);
    const expiryDate = new Date(d.getFullYear() + 1, d.getMonth(), d.getDate());
    if (expiryDate.getTime() - Date.now() > 0) {
        return false;
    }
    return true;
}
