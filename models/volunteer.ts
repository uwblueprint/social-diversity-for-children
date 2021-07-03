import type { provinces, locales } from "@prisma/client";

export type VolunteerInput = {
    id?: string;
    phone_number?: string;
    is_valid?: boolean;
    background_form_link?: string;
    address_line1?: string;
    address_line2?: string;
    postal_code?: string;
    city_name?: string;
    province?: provinces;
    preferred_language?: locales;
};
