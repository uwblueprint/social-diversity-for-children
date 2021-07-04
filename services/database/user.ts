import prisma from "@database";
import {
    Parent,
    ProgramAdmin,
    Teacher,
    Volunteer,
    User,
    roles,
} from "@prisma/client";
import { ParentInput } from "models/parent";
import { ProgramAdminInput } from "models/programadmin";
import { TeacherInput } from "models/teacher";
import { VolunteerInput } from "models/volunteer";
import { UserInput } from "models/user";

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
            teacher: true,
            parent: true,
            programAdmin: true,
            volunteer: true,
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
            teacher: true,
            parent: true,
            programAdmin: true,
            volunteer: true,
        },
    });
    return users;
}

/**
 * Updates a user with the data corresponding to userInput
 * @param userInput - data for the updated user
 * @returns prisma User with updated information
 */

async function updateUser(userInput: UserInput): Promise<User> {
    /*
    Flow:
    - get role and role data from UserInput
    - create/update the role record
    - update the user record
    - return the user, including the role records
    */
    const roleData = userInput.role_data;
    if (!roleData.id) {
        roleData.id = userInput.id;
    }
    const user = await getUser(userInput.id);

    const updateUserArgs = {
        data: {
            first_name: userInput.first_name,
            last_name: userInput.last_name,
            role: userInput.role,
        },
        where: { id: parseInt(userInput.id) },
        include: {
            teachers: true,
            parents: true,
            program_admins: true,
            volunteers: true,
        },
    };

    let updatedUser;

    switch (userInput.role) {
        case roles.PARENT: {
            if (user.role && user.role !== roles.PARENT) {
                return;
            }
            [, updatedUser] = await prisma.$transaction([
                prisma.parent.upsert({
                    create: roleData,
                    update: roleData,
                    where: { id: user.id },
                }),
                prisma.user.update(updateUserArgs),
            ]);
            break;
        }
        case roles.PROGRAM_ADMIN: {
            if (user.role && user.role !== roles.PROGRAM_ADMIN) {
                return;
            }
            [, updatedUser] = await prisma.$transaction([
                prisma.programAdmin.upsert({
                    create: roleData,
                    update: roleData,
                    where: { id: user.id },
                }),
                prisma.user.update(updateUserArgs),
            ]);
            break;
        }
        case roles.VOLUNTEER: {
            if (user.role && user.role !== roles.VOLUNTEER) {
                return;
            }
            [, updatedUser] = await prisma.$transaction([
                prisma.volunteer.upsert({
                    create: roleData,
                    update: roleData,
                    where: { id: user.id },
                }),
                prisma.user.update(updateUserArgs),
            ]);
            break;
        }
        default: {
            return;
        }
    }

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
