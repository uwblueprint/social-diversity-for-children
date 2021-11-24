import { mutate } from "swr";

/**
 * updateFileApproval updates a file's approval from an admin
 * @param filePath
 * @param id
 * @param approval
 * @returns deleted records
 */
export async function updateFileApproval(
    filePath: string,
    id: number,
    approval: boolean | null,
): Promise<Response> {
    const updateData = {
        id: id as number,
        approval: approval,
    };

    const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
    };

    const response = await fetch(
        `/api/admin/update-${filePath}-status`,
        request,
    );

    mutate(`/api/user/${id}`);

    return response;
}
