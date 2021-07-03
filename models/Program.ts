import type { programFormat } from "@prisma/client";

/**
 * Request Body Input for POST /program
 */
export type CreateProgramInput = {
    price: number;
    onlineFormat: programFormat;
    tag: string;
    startDate: string;
    endDate: string;
    isArchived: boolean;
};
