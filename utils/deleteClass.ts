import { mutate } from "swr";

/**
 * deleteClass deletes a class given a class id
 * @param classId id of class to delete from
 * @returns deleted records
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deleteClass(classId: number): Promise<any> {
    const request = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(`/api/class/${classId}`, request);
    const deletedClass = await response.json();

    mutate("/api/class/upcoming");
    mutate("/api/class");

    return deletedClass;
}
