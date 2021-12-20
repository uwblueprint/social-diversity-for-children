import { mutate } from "swr";

/**
 * updateProgramArchive updates a program for whether or not it is archived with admin permission
 * @param id id of program
 * @param isArchive whether or not the program should be archived
 * @returns updated program
 */
export async function updateProgramArchive(id: number, isArchive: boolean): Promise<Response> {
    const request = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isArchive: isArchive }),
    };
    const response = await fetch(`/api/program/archive/${id}`, request);

    mutate("/api/class/upcoming");
    mutate(["/api/program/", false, "archived"]);
    mutate(["/api/program/", true, "archived"]);
    mutate(["/api/class", true, "archived"]);
    mutate(["/api/class", false, "archived"]);

    return response;
}
