export function testPhoneNumber(phonenumber: string) {
    const phoneNumberRegex = new RegExp(
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    );
    return phoneNumberRegex.test(phonenumber);
}

export function testCanadianPostalCode(postalCode: string) {
    const postalCodeRegex = new RegExp(
        /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z][ ]?[0-9][A-Z][0-9]$/,
    );
    return postalCodeRegex.test(postalCode);
}
