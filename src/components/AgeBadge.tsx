import React from "react";
import { BadgeProps } from "@chakra-ui/react";
import { SDCBadge } from "./SDCBadge";
import { AdminBadge } from "./AdminBadge";
import { useTranslation } from "react-i18next";

type AgeBadgeProps = BadgeProps & {
    isOff?: boolean;
    isAdminTheme?: boolean;
    isAgeMinimal: boolean;
    borderAge: number;
};

/**
 * Displays a age group tag in a pres-styled badge
 */

export const AgeBadge: React.FC<AgeBadgeProps> = ({
    isOff,
    isAdminTheme,
    isAgeMinimal,
    borderAge,
    ...restProps
}) => {
    const { t } = useTranslation("common");

    const text = t(isAgeMinimal ? "program.ageGroupAbove" : "program.ageGroupUnder", {
        age: borderAge,
    });

    return isAdminTheme ? (
        <AdminBadge isOff={isOff} {...restProps}>
            {text}
        </AdminBadge>
    ) : (
        <SDCBadge isOff={isOff} {...restProps}>
            {text}
        </SDCBadge>
    );
};
