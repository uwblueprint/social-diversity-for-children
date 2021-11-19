import { mutate } from "swr";

/**
 * deleteProgram deletes a program given a program id
 * @param programId id of program to delete from
 * @returns deleted program
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deleteProgram(programId: number): Promise<any> {
    const request = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(`/api/program/${programId}`, request);
    const deletedProgram = await response.json();

    mutate("/api/class/upcoming");
    mutate("/api/class");
    mutate("/api/program");

    return deletedProgram;
}
