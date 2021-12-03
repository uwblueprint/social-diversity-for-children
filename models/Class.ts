import { weekday } from "@prisma/client";

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
    program: any;
};

export type ClassTranslationInput = {
    name: string;
    description: string;
    language: any;
};

// Information used for the card component of a class.
export type ClassCardInfo = {
    id: number;
    image?: string;
    name?: string;
    description: string;
    borderAge?: number;
    isAgeMinimal: boolean;
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
    teacherName: string;
    teacherEmail?: string;
    teacherImage?: string;
    programId?: number;
    programName?: string;
};
