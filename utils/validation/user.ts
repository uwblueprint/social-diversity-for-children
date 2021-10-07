import { locale, roles, province } from "@prisma/client";
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
function getUserValidationErrors(user: UserInput): Array<string> {
    // validate base user fields
    const validationErrors = [];
    if (
        !validator.isAlphanumeric(user.firstName, undefined, { ignore: " -" })
    ) {
        validationErrors.push("User first name is not alphanumeric");
    }
    if (!validator.isAlphanumeric(user.lastName, undefined, { ignore: " -" })) {
        validationErrors.push("User last name is not alphanumeric");
    }
    if (!VALID_ROLES.has(user.role)) {
        validationErrors.push(`${user.role} is not a valid role`);
    }

    // validate role fields
    if (user.role === roles.PARENT) {
        const roleData = user.roleData as ParentInput;
        if (
            !validator.isAlphanumeric(
                roleData.createStudentInput.firstName,
                undefined,
                {
                    ignore: " -",
                },
            )
        ) {
            validationErrors.push("Child first name is not alphanumeric");
        }
        if (
            !validator.isAlphanumeric(
                roleData.createStudentInput.lastName,
                undefined,
                {
                    ignore: " -",
                },
            )
        ) {
            validationErrors.push("Child last name is not alphanumeric");
        }
        if (!validator.isMobilePhone(roleData.phoneNumber)) {
            validationErrors.push(
                `Invalid phone number provided: ${roleData.phoneNumber}`,
            );
        }
        if (
            !validator.isPostalCode(
                roleData.createStudentInput.postalCode,
                "CA",
            )
        ) {
            validationErrors.push(
                `Invalid postal code provided: ${roleData.createStudentInput.postalCode}`,
            );
        }
        if (!validateProvince(roleData.createStudentInput.province)) {
            validationErrors.push(
                `Invalid province provided: ${roleData.createStudentInput.province}`,
            );
        }
        if (!validatePreferredLanguage(roleData.preferredLanguage)) {
            validationErrors.push(
                `Invalid preferred language: ${roleData.preferredLanguage}`,
            );
        }
        if (!validator.isMobilePhone(roleData.createStudentInput.emergNumber)) {
            validationErrors.push(
                `Invalid emergency contact number provided: ${roleData.createStudentInput.emergNumber}`,
            );
        }
        if (
            !validator.isAlphanumeric(
                roleData.createStudentInput.emergFirstName,
                undefined,
                {
                    ignore: " -",
                },
            )
        ) {
            validationErrors.push(
                "Emergency contact first name is not alphanumeric",
            );
        }
        if (
            !validator.isAlphanumeric(
                roleData.createStudentInput.emergLastName,
                undefined,
                {
                    ignore: " -",
                },
            )
        ) {
            validationErrors.push(
                "Emergency contact last name is not alphanumeric",
            );
        }
    } else if (user.role === roles.PROGRAM_ADMIN) {
        // pass - since program admin has no unique fields
    } else if (user.role === roles.TEACHER) {
        // pass - since teacher role is not currently supported
    } else if (user.role === roles.VOLUNTEER) {
        const roleData = user.roleData as VolunteerInput;
        if (
            roleData.phoneNumber &&
            !validator.isMobilePhone(roleData.phoneNumber)
        ) {
            validationErrors.push(
                `Invalid phone number provided: ${roleData.phoneNumber}`,
            );
        }
        if (
            roleData.postalCode &&
            !validator.isPostalCode(roleData.postalCode, "CA")
        ) {
            validationErrors.push(
                `Invalid postal code provided: ${roleData.postalCode}`,
            );
        }
        if (roleData.province && !validateProvince(roleData.province)) {
            validationErrors.push(
                `Invalid province provided: ${roleData.province}`,
            );
        }
        if (
            roleData.preferredLanguage &&
            !validatePreferredLanguage(roleData.preferredLanguage)
        ) {
            validationErrors.push(
                `Invalid preferred language provided: ${roleData.preferredLanguage}`,
            );
        }
    }

    return validationErrors;
}

export { getUserValidationErrors };
