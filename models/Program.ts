/**
 * Enum for the program format
 */
export enum programFormat {
    online = "online",
    inPerson = "in_person",
    blended = "blended",
}

/**
 * Request Body Input for POST /program
 */
export type createProgramInput = {
    price: number;
    onlineFormat: programFormat;
    tag: string;
    startDate: string;
    endDate: string;
    isArchived: boolean;
};
