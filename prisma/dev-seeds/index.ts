import classUpsert from "./class";
import programUpsert from "./program";
import programTranslationsUpsert from "./program-translation";

/**
 * Seed the Development environment
 */
export default async function seedDev(): Promise<void> {
    await programUpsert();
    await programTranslationsUpsert();
    await classUpsert();
}
