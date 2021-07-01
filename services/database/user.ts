import prisma from "@database";
import { Parent, ProgramAdmin, Teacher, Volunteer, User } from "@prisma/client";
import { ParentInput } from "models/parent";
import { ProgramAdminInput } from "models/programadmin";
import { TeacherInput } from "models/teacher";
import { VolunteerInput } from "models/volunteer";
import { UserInput } from "models/user";

/**
 * NOTE: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
 * getUser takes the id parameter and returns the user associated with the userId
 * @param {number} id - userId
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

/* 
TODO (6/30/21): test passing userId in newTeacherData instead of through connect key
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
        case "PARENT": {
            upsertParent(roleData, user.id);
            break;
        }
        case "PROGRAM_ADMIN": {
            upsertProgramAdmin(roleData, user.id);
            break;
        }
        case "VOLUNTEER": {
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
 * Creates a new teacher corresponding to newTeacherData and
 * returns the newly created teacher
 * @param newTeacherData - data corresponding to the new teacher user
 * @returns - the newly created teacher user
 */
async function upsertTeacher(
    teacherData: TeacherInput,
    userId: string,
): Promise<Teacher> {
    const user = await getUser(userId);
    const data = {
        ...teacherData,
        users: {
            connect: { id: parseInt(userId) },
        },
    };
    let teacher;
    if (user.teachers) {
        teacher = prisma.teacher.create({
            data: data,
        });
    } else {
        teacher = prisma.teacher.update({
            data: data,
            where: {
                id: parseInt(teacherData.id),
            },
        });
    }
    return teacher;
}

/**
 * Creates a new volunteer corresponding to newVolunteerData
 * and returns the newly created volunteer
 * @param newVolunteerData - data corresponding to the new volunteer volunteer user
 * @returns - the newly created volunteer user
 */

async function upsertVolunteer(
    volunteerData: VolunteerInput,
    userId: string,
): Promise<Volunteer> {
    const user = await getUser(userId);
    const data = {
        ...volunteerData,
        users: {
            connect: { id: parseInt(userId) },
        },
    };
    let volunteer;
    if (user.volunteers) {
        volunteer = prisma.volunteer.create({
            data: data,
        });
    } else {
        volunteer = prisma.volunteer.update({
            data: data,
            where: {
                id: parseInt(volunteerData.id),
            },
        });
    }
    return volunteer;
}

/**
 * Creates a new parent corresponding to newUserData and returns
 * the newly created parent
 * @param newParentData - data corresponding to the new parent user
 * @returns - the newly created parent user
 */

async function upsertParent(
    parentData: ParentInput,
    userId: string,
): Promise<Parent> {
    const user = await getUser(userId);
    const data = {
        ...parentData,
        users: {
            connect: { id: parseInt(userId) },
        },
    };
    let parent;
    if (user.parents) {
        parent = prisma.parent.create({
            data: data,
        });
    } else {
        parent = prisma.parent.update({
            data: data,
            where: {
                id: parseInt(parentData.id),
            },
        });
    }
    return parent;
}
/**
 * Creates a new program admin corresponding to newProgramAdminData and
 * returns the newly created program admin
 * @param newProgramAdminData - data corresponding to the new program admin user
 * @returns - the newly created program admin user
 */

async function upsertProgramAdmin(
    programAdminData: ProgramAdminInput,
    userId: string,
): Promise<ProgramAdmin> {
    const user = await getUser(userId);
    const data = {
        ...programAdminData,
        users: {
            connect: { id: parseInt(userId) },
        },
    };
    let programAdmin;
    if (user.program_admins) {
        programAdmin = prisma.programAdmin.create({
            data: data,
        });
    } else {
        programAdmin = prisma.programAdmin.update({
            data: data,
            where: {
                id: parseInt(programAdminData.id),
            },
        });
    }
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
