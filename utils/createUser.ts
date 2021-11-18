import { UserInput } from "@models/User";
import { roles } from "@prisma/client";

/**
 * Create user given email, name, and role of user either (teacher or admin)
 * @param  {string} email
 * @param  {string} firstName
 * @param  {string} lastName
 * @param  {roles} role
 * @returns Promise of created user
 */
export async function createUser(
    email: string,
    firstName: string,
    lastName: string,
    role: roles,
): Promise<Response> {
    const createUserData: UserInput = {
        email,
        firstName,
        lastName,
        role,
    };
    const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createUserData),
    };
    const response = await fetch("/api/user", request);
    return response;
}
/**
 * Create a teacher user given email and full name
 * @param  {string} email
 * @param  {string} firstName
 * @param  {string} lastName
 * @returns Promise of created user
 */
export async function createTeacherUser(
    email: string,
    firstName: string,
    lastName: string,
): Promise<Response> {
    return createUser(email, firstName, lastName, roles.TEACHER);
}
/**
 * Create an admin user given email and full name
 * @param  {string} email
 * @param  {string} firstName
 * @param  {string} lastName
 * @returns Promise of created user
 */
export async function createAdminUser(
    email: string,
    firstName: string,
    lastName: string,
): Promise<Response> {
    return createUser(email, firstName, lastName, roles.PROGRAM_ADMIN);
}
