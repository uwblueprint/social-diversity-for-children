/**
 * Enum for the program format
 */
export enum ProgramFormat {
    online = "online",
    inPerson = "in_person",
    blended = "blended",
}

/**
 * Request Body Input for POST /program
 */
export type CreateProgramInput = {
    price: number;
    onlineFormat: ProgramFormat;
    tag: string;
    startDate: string;
    endDate: string;
    isArchived: boolean;
};
