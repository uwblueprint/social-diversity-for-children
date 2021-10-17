import { ClassTranslation, locale, ProgramTranslation } from ".prisma/client";

/**
 * @class TranslationUtil: Class for handling translations
 */
export class TranslationUtil {
    /**
     * Method for returning main translation given array of class translations. We always backup to english.
     * @param translations class translations
     * @param language locale wanted
     * @return main translation to be used
     */
    static getMainClassTranslation(
        translations: ClassTranslation[],
        language: locale,
    ): ClassTranslation {
        if (translations.length === 0) {
            return null;
        } else if (translations.length === 1) {
            return translations[0];
        }

        // Return translation matching locale or fallback to english
        let fallBackTranslation;
        for (const translation of translations) {
            if (translation.language === language) {
                return translation;
            } else if (translation.language === locale.en) {
                fallBackTranslation = translation;
            }
        }
        return fallBackTranslation;
    }

    /**
     * Method for returning main translation given array of program translations. We always backup to english.
     * @param translations program translations
     * @param language locale wanted
     * @return main translation to be used
     */
    static getMainProgramTranslation(
        translations: ProgramTranslation[],
        language: locale,
    ): ProgramTranslation {
        if (translations.length === 0) {
            return null;
        } else if (translations.length === 1) {
            return translations[0];
        }

        // Return translation matching locale or fallback to english
        let fallBackTranslation;
        for (const translation of translations) {
            if (translation.language === language) {
                return translation;
            } else if (translation.language === locale.en) {
                fallBackTranslation = translation;
            }
        }
        return fallBackTranslation;
    }
}
