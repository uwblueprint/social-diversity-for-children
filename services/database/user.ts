import prisma from "@database";
import { Parent, ProgramAdmin, Teacher, Volunteer, User } from "@prisma/client";
import { ParentInput } from "models/parent";
import { ProgramAdminInput } from "models/programadmin";
import { TeacherInput } from "models/teacher";
import { VolunteerInput } from "models/volunteer";
import { UserInput } from "models/user";
import { Role } from "models/role";
import { assert } from "console";

/**
 * NOTE: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
 * getUser takes the id parameter and returns the user associated with the userId
 * @param {string} id - userId
 */
async function getUser(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            teachers: true,
            parents: true,
            program_admins: true,
            volunteers: true,
        },
    });
    return user;
}

/**
 * getUsers returns all the users
 */
async function getUsers() {
    const users = await prisma.user.findMany({
        include: {
            teachers: true,
            parents: true,
            program_admins: true,
            volunteers: true,
        },
    });
    return users;
}

/**
 * Updates a user with the data corresponding to userInput
 * @param userInput - data for the updated user
 * @returns prisma User with updated information
 */

async function updateUser(user: UserInput): Promise<User> {
    /*
    Flow:
    - get role and role data from UserInput
    - create/update the role record
    - update the user record
    - return the user, including the role records
    */
    const roleData = user.role_data;
    switch (user.role) {
        case Role.Parent: {
            upsertParent(roleData, user.id);
            break;
        }
        case Role.ProgramAdmin: {
            upsertProgramAdmin(roleData, user.id);
            break;
        }
        case Role.Volunteer: {
            upsertVolunteer(roleData, user.id);
            break;
        }
    }

    const updatedUser = await prisma.user.update({
        data: {
            first_name: user.first_name,
            last_name: user.last_name,
        },
        where: { id: parseInt(user.id) },
        include: {
            teachers: true,
            parents: true,
            program_admins: true,
            volunteers: true,
        },
    });
    return updatedUser;
}

/**
 * Inserts a new teacher or updates information corresponding to teacherData and returns
 * the newly created or updated teacher
 * @param TeacherData - data corresponding to the new teacher user
 * @returns - the newly created or updated teacher user
 */
async function upsertTeacher(
    teacherData: TeacherInput,
    userId: string,
): Promise<Teacher> {
    const id: number = parseInt(userId);
    const upsertTeacherData = {
        ...teacherData,
        id: id,
    };
    const teacher = await prisma.teacher.upsert({
        create: upsertTeacherData,
        update: upsertTeacherData,
        where: { id: id },
    });
    return teacher;
}

/**
 * Inserts a new volunteer or updates information corresponding to volunteerData and returns
 * the newly created or updated volunteer
 * @param VolunteerData - data corresponding to the new parent user
 * @returns - the newly created or updated volunteer user
 */
async function upsertVolunteer(
    volunteerData: VolunteerInput,
    userId: string,
): Promise<Volunteer> {
    const id: number = parseInt(userId);
    const upsertVolunteerData = {
        ...volunteerData,
        id: id,
    };
    const volunteer = await prisma.volunteer.upsert({
        create: upsertVolunteerData,
        update: upsertVolunteerData,
        where: { id: id },
    });
    return volunteer;
}


/**
 * Inserts a new parent or updates information corresponding to parentData and returns
 * the newly created or updated parent
 * @param ParentData - data corresponding to the new parent user
 * @returns - the newly created or updated parent user
 */

async function upsertParent(
    parentData: ParentInput,
    userId: string,
): Promise<Parent> {
    const id: number = parseInt(userId);
    const upsertParentData = {
        ...parentData,
        id: id,
    };
    const parent = await prisma.parent.upsert({
        create: upsertParentData,
        update: upsertParentData,
        where: { id: id },
    });
    return parent;
}


/**
 * Inserts a new programAdmin or updates information corresponding to programAdminData and returns
 * the newly created or updated programAdmin
 * @param ParentData - data corresponding to the new programAdmin user
 * @returns - the newly created or updated programAdmin user
 */

async function upsertProgramAdmin(
    programAdminData: ProgramAdminInput,
    userId: string,
): Promise<ProgramAdmin> {
    const id: number = parseInt(userId);
    const upsertProgramAdminData = {
        ...programAdminData,
        id: id,
    };
    const programAdmin = await prisma.programAdmin.upsert({
        create: upsertProgramAdminData,
        update: upsertProgramAdminData,
        where: { id: id },
    });
    return programAdmin;
}

export {
    getUser,
    getUsers,
    updateUser,
    upsertParent,
    upsertProgramAdmin,
    upsertTeacher,
    upsertVolunteer,
};
