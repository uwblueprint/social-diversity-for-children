/**
 * Enum for the weekday field of class
 */
export enum weekdays {
    MON = "MON",
    TUE = "TUE",
    WED = "WED",
    THU = "THU",
    FRI = "FRI",
    SAT = "SAT",
    SUN = "SUN",
}

/**
 * Request Body Input for POST /class
 */
export type createClassInput = {
    name: string;
    ageGroup: string;
    programId: number;
    spaceTotal: number;
    volunteerSpaceTotal: number;
    startDate: string;
    endDate: string;
    weekday: weekdays;
    startTimeMinutes: number;
    durationMinutes: number;
};
