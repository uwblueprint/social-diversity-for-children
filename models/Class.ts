import { weekday } from "@prisma/client";
import type { locale } from "@prisma/client";

/**
 * Request Body Input for POST /class
 */
export type ClassInput = {
    name?: string;
    borderAge: number;
    isAgeMinimal: boolean;
    stripePriceId: string;
    spaceTotal: number;
    volunteerSpaceTotal: number;
    startDate: string;
    endDate: string;
    weekday: weekday;
    startTimeMinutes: number;
    durationMinutes: number;
    price: string;
    programId: number;
    id?: number;
};

export type ClassTranslationInput = {
    name: string;
    description: string;
    language: locale;
};

// Information used for the card component of a class.
export type ClassCardInfo = {
    id: number;
    image?: string;
    name?: string;
    description: string;
    translations?: { name: string; description: string; language: locale }[];
    borderAge?: number;
    isAgeMinimal: boolean;
    isArchived: boolean;
    stripePriceId: string;
    spaceAvailable: number;
    spaceTaken: number;
    spaceTotal: number;
    volunteerSpaceAvailable: number;
    volunteerSpaceTaken: number;
    volunteerSpaceTotal: number;
    weekday: weekday;
    startDate: Date;
    endDate: Date;
    startTimeMinutes: number;
    durationMinutes: number;
    teacherId?: number;
    teacherName: string;
    teacherEmail?: string;
    teacherImage?: string;
    programId?: number;
    programName?: string;
};
