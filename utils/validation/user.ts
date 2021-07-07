import { locale, roles } from ".prisma/client";
import { UserInput, ParentInput, VolunteerInput } from "models/User";
import validator from "validator";

function validateProvince(province) {
    return [
        province.AB,
        province.BC,
        province.MB,
        province.NB,
        province.NL,
        province.NS,
        province.NT,
        province.NU,
        province.ON,
        province.PE,
        province.QC,
        province.SK,
        province.YT,
    ].includes(province);
}

function validatePreferredLanguage(language) {
    return [locale.en, locale.ja, locale.ko, locale.zh].includes(language);
}

function validateUser(user: UserInput): boolean {
    // validate base user fields
    const firstNameIsAlpha = validator.isAlpha({
        str: user.firstName,
        options: " -",
    });
    const lastNameIsAlpha = validator.isAlpha({
        str: user.lastName,
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
        const roleData: ParentInput = user.roleData;
        const phoneNumberIsValid = validator.isMobilePhone(
            roleData.phoneNumber,
        );
        const postalCodeIsValid = validator.isPostalCode(roleData.postalCode);
        const provinceIsValid = validateProvince(roleData.province);
        const preferredLanguageIsValid = validatePreferredLanguage(
            roleData.preferredLanguage,
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
        const roleData: VolunteerInput = user.roleData;
        const phoneNumberIsValid =
            !roleData.phoneNumber ||
            validator.isMobilePhone(roleData.phoneNumber);
        const postalCodeIsValid =
            !roleData.postalCode || validator.isPostalCode(roleData.postalCode);
        const provinceIsValid =
            roleData.province || validateProvince(roleData.province);
        const preferredLanguageIsValid =
            roleData.preferredLanguage ||
            validatePreferredLanguage(roleData.preferredLanguage);
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
