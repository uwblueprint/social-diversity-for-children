import classUpsert from "./class";
import programUpsert from "./program";
import programTranslationsUpsert from "./program-translation";

/**
 * Seed the Production environment
 */
export default async function seedProd(): Promise<void> {
    await programUpsert();
    await programTranslationsUpsert();
    await classUpsert();
}
