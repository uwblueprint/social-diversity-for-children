import { weekday } from "@prisma/client";

/**
 * Request Body Input for POST /class
 */
export type CreateClassInput = {
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
