import type { provinces, locales } from "@prisma/client";

export type ParentInput = {
    id: string;
    phoneNumber: string;
    isLowIncome?: boolean;
    addressLine1: string;
    addressLine2?: string;
    postalCode: string;
    cityName: string;
    province: provinces;
    preferredLanguage: locales;
};
