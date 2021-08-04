import { locale, roles, province } from ".prisma/client";
import { UserInput, ParentInput, VolunteerInput } from "models/User";
import validator from "validator";

const VALID_ROLES = new Set([
    roles.PARENT,
    roles.PROGRAM_ADMIN,
    roles.TEACHER,
    roles.VOLUNTEER,
    null,
]);
const VALID_PROVINCES = new Set([
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
]);
const VALID_LANGUAGES = new Set([locale.en, locale.ja, locale.ko, locale.zh]);

/**
 * Valdaites whether a given province has been specified correctly
 * @param userProvince - the province to validate
 * @returns - true if the province is valid, false otherwise
 */
function validateProvince(userProvince) {
    return VALID_PROVINCES.has(userProvince);
}

/**
 * Validates whether the specified preferred language has been specified correctly
 * @param userLanguage - the preferred language to validate
 * @returns - true if the language is valid, false otherwise
 */
function validatePreferredLanguage(userLanguage) {
    return VALID_LANGUAGES.has(userLanguage);
}

/**
 * Validates the input for updating a user and its corresponding role
 * @param user - the user data to validate
 * @returns - true if the user data is valid, false otherwise
 */
function userIsValid(user: UserInput): boolean {
    // validate base user fields
    const firstNameIsAlpha = validator.isAlpha(user.firstName, undefined, " -");
    const lastNameIsAlpha = validator.isAlpha(user.lastName, undefined, " -");
    const roleIsValid = VALID_ROLES.has(user.role);

    // validate the User fields
    const userDataIsValid = firstNameIsAlpha && lastNameIsAlpha && roleIsValid;

    // validate role fields
    let roleDataIsValid;
    if (user.role === roles.PARENT) {
        const roleData = user.roleData as ParentInput;
        const phoneNumberIsValid = validator.isMobilePhone(
            roleData.phoneNumber,
        );
        const postalCodeIsValid = validator.isPostalCode(
            roleData.postalCode,
            "CA",
        );
        const provinceIsValid = validateProvince(roleData.province);
        const preferredLanguageIsValid = validatePreferredLanguage(
            roleData.preferredLanguage,
        );
        const emergencyNumberIsValid = validator.isMobilePhone(
            roleData.emergencyContactPhoneNumber,
        );
        // Eric: Not sure if this is needed to be validated.
        const isValidDOB = validator.isDate(roleData.childDateOfBirth);
        roleDataIsValid =
            phoneNumberIsValid &&
            postalCodeIsValid &&
            provinceIsValid &&
            preferredLanguageIsValid &&
            emergencyNumberIsValid &&
            isValidDOB;
    } else if (user.role === roles.PROGRAM_ADMIN) {
        // pass - since program admin has no unique fields
    } else if (user.role === roles.TEACHER) {
        // pass - since teacher role is not currently supported
    } else if (user.role === roles.VOLUNTEER) {
        const roleData: VolunteerInput = user.roleData;
        const phoneNumberIsValid =
            !roleData.phoneNumber ||
            validator.isMobilePhone(roleData.phoneNumber);
        const postalCodeIsValid =
            !roleData.postalCode ||
            validator.isPostalCode(roleData.postalCode, "CA");
        const provinceIsValid =
            !roleData.province || validateProvince(roleData.province);
        const preferredLanguageIsValid =
            !roleData.preferredLanguage ||
            validatePreferredLanguage(roleData.preferredLanguage);
        roleDataIsValid =
            phoneNumberIsValid &&
            postalCodeIsValid &&
            provinceIsValid &&
            preferredLanguageIsValid;
    } else {
        // if the user role does not satisfy one of the above conditions,
        //  it must be null/undefined - otherwise it's invalid
        roleDataIsValid = !user.role ? true : false;
    }

    return userDataIsValid && roleDataIsValid;
}

export { userIsValid };
