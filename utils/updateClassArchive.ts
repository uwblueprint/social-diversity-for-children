import { mutate } from "swr";

/**
 * updateClassArchive updates a class for whether or not it is archived with admin permission
 * @param id id of class
 * @param isArchive whether or not the class should be archived
 * @returns updated class
 */
export async function updateClassArchive(
    id: number,
    isArchive: boolean,
    /* eslint-disable @typescript-eslint/no-explicit-any */
): Promise<any> {
    const request = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isArchive: isArchive }),
    };
    const response = await fetch(`/api/class/archive/${id}`, request);
    const updatedClass = await response.json();

    mutate("/api/class/upcoming");
    mutate("/api/class");

    return updatedClass;
}
