import { locales, provinces, roles } from ".prisma/client";
import { ParentInput } from "models/parent";
import { VolunteerInput } from "models/volunteer";
import { UserInput } from "models/user";
import validator from "validator";

function validateProvince(province) {
    return [
        provinces.AB,
        provinces.BC,
        provinces.MB,
        provinces.NB,
        provinces.NL,
        provinces.NS,
        provinces.NT,
        provinces.NU,
        provinces.ON,
        provinces.PE,
        provinces.QC,
        provinces.SK,
        provinces.YT,
    ].includes(province);
}

function validatePreferredLanguage(language) {
    return [locales.en, locales.ja, locales.ko, locales.zh].includes(language);
}

function validateUser(user: UserInput): boolean {
    // validate base user fields
    const firstNameIsAlpha = validator.isAlpha({
        str: user.first_name,
        options: " -",
    });
    const lastNameIsAlpha = validator.isAlpha({
        str: user.last_name,
        options: " -",
    });
    const roleIsValid = [
        roles.PARENT,
        roles.PROGRAM_ADMIN,
        roles.TEACHER,
        roles.VOLUNTEER,
        null,
    ].includes(user.role);

    const userDataIsValid = firstNameIsAlpha && lastNameIsAlpha && roleIsValid;

    // validate role fields
    let roleDataIsValid;
    if (user.role === roles.PARENT) {
        const roleData: ParentInput = user.role_data;
        const phoneNumberIsValid = validator.isMobilePhone(
            roleData.phone_number,
        );
        const postalCodeIsValid = validator.isPostalCode(roleData.postal_code);
        const provinceIsValid = validateProvince(roleData.province);
        const preferredLanguageIsValid = validatePreferredLanguage(
            roleData.preferred_language,
        );
        roleDataIsValid =
            phoneNumberIsValid &&
            postalCodeIsValid &&
            provinceIsValid &&
            preferredLanguageIsValid;
    } else if (user.role === roles.PROGRAM_ADMIN) {
        // pass
    } else if (user.role === roles.TEACHER) {
        // pass
    } else if (user.role === roles.VOLUNTEER) {
        const roleData: VolunteerInput = user.role_data;
        const phoneNumberIsValid =
            !roleData.phone_number ||
            validator.isMobilePhone(roleData.phone_number);
        const postalCodeIsValid =
            !roleData.postal_code ||
            validator.isPostalCode(roleData.postal_code);
        const provinceIsValid =
            roleData.province || validateProvince(roleData.province);
        const preferredLanguageIsValid =
            roleData.preferred_language ||
            validatePreferredLanguage(roleData.preferred_language);
        roleDataIsValid =
            phoneNumberIsValid &&
            postalCodeIsValid &&
            provinceIsValid &&
            preferredLanguageIsValid;
    } else {
        roleDataIsValid = !user.role ? true : false;
    }

    return userDataIsValid && roleDataIsValid;
}

export { validateUser };
