import React from "react";
import { Badge, BadgeProps } from "@chakra-ui/react";

export const SDCBadge: React.FC<BadgeProps> = (props) => {
    return (
        <Badge
            borderRadius="full"
            textTransform="capitalize"
            fontWeight="medium"
            letterSpacing="wide"
            backgroundColor="#0C53A0"
            textAlign="center"
            color="white"
            pb="1"
            pt="1.5"
            px="3"
            {...props}
        />
    );
};
