/**
 * custom type enumerating days of the week for the createProgramInput custom type
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
 * custom type used for the POST endpoint when creating a new program
 * id is not required and is automatically incremented in the record
 */
export type createProgramInput = {
    price: number;
    startDate: string;
    endDate: string;
    weekday: weekdays;
    startTimeMinutes: number;
    durationMinutes: number;
    spaceTotal: number;
    spaceAvailable: number;
    volunteerSpaceTotal: number;
    volunteerSpaceAvailable: number;
    isArchived: boolean;
};
