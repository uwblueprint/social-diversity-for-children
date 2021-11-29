import { mutate } from "swr";

/**
 * deleteUser deletes a user given their id
 * @param id id of user to delete
 * @returns the response with the deleted user
 */
export async function deleteUser(id: number): Promise<Response> {
    const request = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(`/api/user/${id}`, request);

    mutate("/api/user");

    return response;
}
