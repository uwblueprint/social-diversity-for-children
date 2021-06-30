import prisma from "@database";
import { Parent, ProgramAdmin, Teacher, Volunteer } from "@prisma/client";
import { CreateParentInput } from "models/parent";
import { CreateProgramAdminInput } from "models/programadmin";
import { CreateTeacherInput } from "models/teacher";
import { CreateVolunteerInput } from "models/volunteer";

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

/* 
TODO (6/27/21): https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create 
doc does not specify what happens if the create operation fails - does that mean it should always
succeed? in that case, do we need to return anything or do we just return response 200 every time?
*/

/**
 * Creates a new teacher corresponding to newTeacherData and
 * returns the newly created teacher
 * @param newTeacherData - data corresponding to the new teacher user
 * @returns - the newly created teacher user
 */
async function createTeacher(
    newTeacherData: CreateTeacherInput,
    userId: number,
): Promise<Teacher> {
    const teacher = await prisma.teacher.create({
        data: {
            ...newTeacherData,
            users: {
                connect: { id: userId },
            },
        },
    });
    return teacher;
}

/**
 * Creates a new volunteer corresponding to newVolunteerData
 * and returns the newly created volunteer
 * @param newVolunteerData - data corresponding to the new volunteer volunteer user
 * @returns - the newly created volunteer user
 */
async function createVolunteer(
    newVolunteerData: CreateVolunteerInput,
    userId: number,
): Promise<Volunteer> {
    const volunteer = await prisma.volunteer.create({
        data: {
            ...newVolunteerData,
            users: {
                connect: { id: userId },
            },
        },
    });
    return volunteer;
}

/**
 * Creates a new parent corresponding to newUserData and returns
 * the newly created parent
 * @param newParentData - data corresponding to the new parent user
 * @returns - the newly created parent user
 */

async function createParent(
    newParentData: CreateParentInput,
    userId: number,
): Promise<Parent> {
    const parent = await prisma.parent.create({
        data: {
            ...newParentData,
            users: {
                connect: { id: userId },
            },
        },
    });
    return parent;
}

/**
 * Creates a new program admin corresponding to newProgramAdminData and
 * returns the newly created program admin
 * @param newProgramAdminData - data corresponding to the new program admin user
 * @returns - the newly created program admin user
 */

async function createProgramAdmin(
    newProgramAdminData: CreateProgramAdminInput,
    userId: number,
): Promise<ProgramAdmin> {
    const programAdmin = await prisma.programAdmin.create({
        data: {
            ...newProgramAdminData,
            users: {
                connect: { id: userId },
            },
        },
    });
    return programAdmin;
}

export {
    getUser,
    getUsers,
    createParent,
    createProgramAdmin,
    createTeacher,
    createVolunteer,
};
