// TODO: weekday field got moved to class so we can move this to Class.ts after
// export enum weekdays {
//     MON = "MON",
//     TUE = "TUE",
//     WED = "WED",
//     THU = "THU",
//     FRI = "FRI",
//     SAT = "SAT",
//     SUN = "SUN",
// }

export enum programFormat {
    online = "online",
    inPerson = "in_person",
    blended = "blended",
}

export type createProgramInput = {
    price: number;
    onlineFormat: programFormat;
    tag: string;
    startDate: string;
    endDate: string;
    isArchived: boolean;
};
