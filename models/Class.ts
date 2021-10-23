import { weekday } from "@prisma/client";
import { ProgramCardInfo } from "./Program";

/**
 * Request Body Input for POST /class
 */
export type ClassInput = {
    name?: string;
    borderAge?: number;
    isAgeMinimal: boolean;
    programId: number;
    stripePriceId: string;
    spaceTotal: number;
    volunteerSpaceTotal: number;
    startDate: string;
    endDate: string;
    weekday: weekday;
    startTimeMinutes: number;
    durationMinutes: number;
};

// Information used for the card component of a class.
export type ClassCardInfo = {
    id: number;
    image?: string;
    name?: string;
    description: string;
    borderAge?: number;
    isAgeMinimal: boolean;
    spaceAvailable: number;
    spaceTotal: number;
    volunteerSpaceAvailable: number;
    volunteerSpaceTotal: number;
    weekday: weekday;
    startDate: Date;
    endDate: Date;
    startTimeMinutes: number;
    durationMinutes: number;
    teacherName: string;
    teacherEmail?: string;
    teacherImage?: string;
    programName?: string;
};
