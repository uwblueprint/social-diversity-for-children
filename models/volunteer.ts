import type { provinces, locales } from "@prisma/client";

export type VolunteerInput = {
    id?: string | null;
    phone_number?: string | null;
    is_valid?: boolean | null;
    background_form_link?: string | null;
    address_line1?: string | null;
    address_line2?: string | null;
    postal_code?: string | null;
    city_name?: string | null;
    province?: provinces | null;
    preferred_language?: locales | null;
};
