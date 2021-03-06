import type { programFormat } from "@prisma/client";
import type { locale } from "@prisma/client";
/**
 * custom type used for the POST endpoint when creating a new program
 * id is not required and is automatically incremented in the record
 */

export type ProgramTranslationData = {
    name: string;
    description: string;
    language: locale;
};
export type ProgramInput = {
    onlineFormat: programFormat;
    tag: string;
    startDate: Date;
    endDate: Date;
    imageLink: string;
    isArchived: boolean;
    id?: number;
};

// Info for the program card on the home page
export type ProgramCardInfo = {
    id: number;
    isArchived: boolean;
    name: string;
    description: string;
    translations?: { name: string; description: string; language: locale }[];
    image?: string;
    startDate: Date;
    endDate: Date;
    tag: string;
    onlineFormat: string;
};
