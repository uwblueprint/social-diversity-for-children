import React from "react";
import { Badge, BadgeProps } from "@chakra-ui/react";
import colourTheme from "@styles/colours";

type AdminBadgeProps = BadgeProps & { isOff?: boolean };

/**
 * Displays a tag in a pres-styled badge - use the children prop for text
 */
export const AdminBadge: React.FC<AdminBadgeProps> = ({ isOff, ...restProps }) => {
    return (
        <Badge
            borderRadius="full"
            fontWeight="medium"
            letterSpacing="wide"
            textTransform="none"
            backgroundColor={
                isOff ? colourTheme.colors.DarkGray : colourTheme.colors.PeriwinkleGray
            }
            textAlign="center"
            color={colourTheme.colors.Blue}
            pb="1"
            pt="1.5"
            px="3"
            {...restProps}
        />
    );
};
