import { weekday } from "@prisma/client";

/**
 * Request Body Input for POST /class
 */
export type ClassInput = {
    name?: string;
    ageGroup?: string;
    programId: number;
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
    image?: string;
    name?: string;
    ageGroup?: string;
    spaceAvailable: number;
    volunteerSpaceAvailable: number;
    weekday: weekday;
    startTimeMinutes: number;
    durationMinutes: number;
    teacherName: string;
    teacherEmail?: string;
    teacherImage?: string;
};
