import { roles } from ".prisma/client";
import { Session } from "next-auth";

/**
 * A helper method to see if current session is an internal user
 * @param  {Session} session current user session
 * @returns boolean whether or not session is from an internal user
 */
export function isInternal(session: Session): boolean {
    const internalUsers: roles[] = [roles.PROGRAM_ADMIN, roles.TEACHER];
    if (session && internalUsers.includes(session.role)) {
        return true;
    } else {
        false;
    }
}

/**
 * A helper method to see if current user is admin
 * @param  {Session} session current user session
 * @returns boolean whether or not user is admin
 */
export function isAdmin(session: Session): boolean {
    if (session && session.role === roles.PROGRAM_ADMIN) {
        return true;
    } else {
        false;
    }
}

/**
 * A helper method to see if current session is a teacher
 * @param  {Session} session current user session
 * @returns boolean whether or not session is a teacher
 */
export function isTeacher(session: Session): boolean {
    if (session && session.role === roles.TEACHER) {
        return true;
    } else {
        false;
    }
}
