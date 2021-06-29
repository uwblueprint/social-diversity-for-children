export enum weekdays {
    MON = "MON",
    TUE = "TUE",
    WED = "WED",
    THU = "THU",
    FRI = "FRI",
    SAT = "SAT",
    SUN = "SUN",
}

export type createProgramInput = {
    price: number;
    start_date: string;
    end_date: string;
    weekday: weekdays;
    start_time_minutes: number;
    duration_minutes: number;
    space_total: number;
    space_available: number;
    volunteer_space_total: number;
    volunteer_space_available: number;
    is_archived?: boolean;
};
