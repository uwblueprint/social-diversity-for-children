import { ParentWaitlistInput } from "@models/Enroll";
import { Parent } from "@prisma/client";
import { mutate } from "swr";

/**
 * deleteWaitlistRegistration deletes a waitlist for a class given a parent
 * @param parent parent's record to delete
 * @param classId id of class to delete from
 * @returns deleted records
 */
export async function deleteWaitlistRegistration(parent: Parent, classId: number) {
    const registrationData: ParentWaitlistInput = {
        classId,
        parentId: parent.id,
    };
    const request = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
    };

    const response = await fetch("/api/waitlist", request);
    const deletedRegistration = await response.json();

    mutate("/api/waitlist");

    return deletedRegistration;
}
