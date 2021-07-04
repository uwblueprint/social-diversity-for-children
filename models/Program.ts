import type { programFormat } from "@prisma/client";

/**
 * custom type used for the POST endpoint when creating a new program
 * id is not required and is automatically incremented in the record
 */
export type CreateProgramInput = {
    price: number;
    onlineFormat: programFormat;
    tag: string;
    startDate: string;
    endDate: string;
};
