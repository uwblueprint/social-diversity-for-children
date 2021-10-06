import React from "react";
import { Badge, BadgeProps } from "@chakra-ui/react";
import colourTheme from "@styles/colours";

/**
 * Displays a tag in a pres-styled badge - use the children prop for text
 */
export const SDCBadge: React.FC<BadgeProps> = (props) => {
    return (
        <Badge
            borderRadius="full"
            fontWeight="medium"
            letterSpacing="wide"
            backgroundColor={colourTheme.colors.Blue}
            textAlign="center"
            color="white"
            pb="1"
            pt="1.5"
            px="3"
            {...props}
        />
    );
};
