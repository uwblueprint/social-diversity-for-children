import type { provinces, locales } from "@prisma/client";

export type VolunteerInput = {
    id: string;
    phoneNumber?: string;
    isValid?: boolean;
    backgroundFormLink?: string;
    addressLine1?: string;
    addressLine2?: string;
    postalCode?: string;
    cityName?: string;
    province?: provinces;
    preferredLanguage?: locales;
};
