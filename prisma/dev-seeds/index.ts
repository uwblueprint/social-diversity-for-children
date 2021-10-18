import classUpsert from "./class";
import classTranslationsUpsert from "./class-translation";
import parentUpsert from "./parent";
import parentRegUpsert from "./parent-reg";
import programUpsert from "./program";
import programTranslationsUpsert from "./program-translation";
import studentUpsert from "./student";
import teacherUpsert from "./teacher";
import teacherRegUpsert from "./teacher-reg";
import userUpsert from "./user";
import volunteerUpsert from "./volunteer";
import volunteerRegUpsert from "./volunteer-reg";

/**
 * Seed the Development environment
 */
export default async function seedDev(): Promise<void> {
    await programUpsert();
    await programTranslationsUpsert();
    await classUpsert();
    await classTranslationsUpsert();
    await userUpsert();
    await teacherUpsert();
    await teacherRegUpsert();
    await volunteerUpsert();
    await volunteerRegUpsert();
    await parentUpsert();
    await studentUpsert();
    await parentRegUpsert();
}
