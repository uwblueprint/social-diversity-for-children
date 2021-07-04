import type { provinces, locales } from "@prisma/client";

export type ParentInput = {
    id: string;
    phone_number: string;
    is_low_income?: boolean;
    address_line1: string;
    address_line2?: string;
    postal_code: string;
    city_name: string;
    province: provinces;
    preferred_language: locales;
};
