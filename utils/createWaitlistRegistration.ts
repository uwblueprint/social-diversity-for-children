import { WaitlistInput } from "@models/Waitlist";
import { Parent } from "@prisma/client";
import { mutate } from "swr";

/**
 * createWaitlistRegistration creates a waitlist record for a class for a parent
 * @param parent parent's record to create
 * @param classId id of class to create the record to
 * @returns Promise of waitlist response
 */
export async function createWaitlistRegistration(
    parent: Parent,
    classId: number,
): Promise<Response> {
    const registrationData: WaitlistInput = {
        parentId: parent.id,
        classId: classId,
    };

    const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
    };

    const response = await fetch("/api/waitlist", request);

    mutate("/api/waitlist");

    return response;
}
