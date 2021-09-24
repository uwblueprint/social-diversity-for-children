import classUpsert from "./class";
import classTranslationsUpsert from "./class-translation";
import programUpsert from "./program";
import programTranslationsUpsert from "./program-translation";
import teacherUpsert from "./teacher";
import teacherRegUpsert from "./teacher-reg";
import userUpsert from "./user";

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
}
