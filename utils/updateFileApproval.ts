import { Student } from "@prisma/client";
import { mutate } from "swr";

/**
 * updateFileApproval updates a file's approval from an admin
 * @param filePath
 * @param email
 * @param approval
 * @returns deleted records
 */
export async function updateFileApproval(
    filePath: string,
    email: string,
    approval: boolean | null,
): Promise<Response> {
    const updateData = {
        email: email,
        approval: approval,
    };

    const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
    };
    console.log(request.body);

    const response = await fetch(
        `/api/admin/update-${filePath}-status`,
        request,
    );

    mutate(`/api/admin/update-${filePath}-status`);

    return response;
}
