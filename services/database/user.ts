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
async function updateUser(userInput: UserInput): Promise<User> {
    /*
    Flow:
    - get role and role data from UserInput
    - create/update the role record
    - update the user record
    - return the user, including the role records
    */
    const roleData = userInput.role_data;
    const user = await getUser(userInput.id);

    switch (userInput.role) {
        case roles.PARENT: {
            assert(!user.role || user.role === roles.PARENT);
            upsertParent(roleData, userInput.id);
            break;
        }
        case roles.PROGRAM_ADMIN: {
            assert(!user.role || user.role === roles.PROGRAM_ADMIN);
            upsertProgramAdmin(roleData, userInput.id);
            break;
        }
        case roles.VOLUNTEER: {
            assert(!user.role || user.role === roles.VOLUNTEER);
            upsertVolunteer(roleData, userInput.id);
            break;
        }
    }

    const updatedUser = await prisma.user.update({
        data: {
            first_name: userInput.first_name,
            last_name: userInput.last_name,
        },
        where: { id: parseInt(userInput.id) },
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
 * @returns - upserted teacher user
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
 * Creates a new volunteer corresponding to newVolunteerData
 * and returns the newly created volunteer
 * @param newVolunteerData - data corresponding to the new volunteer volunteer user
 * @returns - upserted volunteer user
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
 * TODO (July 1):
 *  - update upsertParent and upsertProgramAdmin to match upsertVolunteer
 *  - update the function documentation
 *      - update description to have the correct names for the args
 *      - update the param names
 *      - update terminology (e.g., "upsert" or "insert/update" instead of "create")
 */

/**
 * Creates a new parent corresponding to newUserData and returns
 * the newly created parent
 * @param newParentData - data corresponding to the new parent user
 * @returns - upserted parent user
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
