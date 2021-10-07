import { VolunteerRegistrationInput } from "@models/Enroll";
import { User } from "@prisma/client";
import { mutate } from "swr";

/**
 * deleteVolunteerRegistration deletes a registration for a class given a volunteer
 * @param volunteer volunteer's record to delete
 * @param classId id of class to delete from
 * @returns deleted records
 */
export async function deleteVolunteerRegistration(
    volunteer: User,
    classId: number,
) {
    const registrationData: VolunteerRegistrationInput = {
        classId,
        volunteerId: volunteer.id,
    };
    const request = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
    };

    const response = await fetch("api/enroll/volunteer", request);
    const deletedRegistration = await response.json();

    mutate("/api/enroll/volunteer");

    return deletedRegistration;
}
