import React from "react";
import { Badge, BadgeProps } from "@chakra-ui/react";
import colourTheme from "@styles/colours";

type SDCBadgeProps = BadgeProps & { isOff?: boolean };

/**
 * Displays a tag in a pres-styled badge - use the children prop for text
 */
export const SDCBadge: React.FC<SDCBadgeProps> = ({ isOff, ...restProps }) => {
    return (
        <Badge
            borderRadius="full"
            fontWeight="medium"
            letterSpacing="wide"
            textTransform="none"
            backgroundColor={isOff ? "darkgray" : colourTheme.colors.Blue}
            textAlign="center"
            color="white"
            pb="1"
            pt="1.5"
            px="3"
            {...restProps}
        />
    );
};
