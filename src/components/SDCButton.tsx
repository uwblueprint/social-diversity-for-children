import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import colourTheme from "@styles/colours";

/**
 * Displays a pres-styled button used across the platform
 */
export const SDCButton: React.FC<ButtonProps> = (props) => {
    return (
        <Button
            bg={colourTheme.colors.Blue}
            color={"white"}
            mx={"auto"}
            my={2}
            fontWeight={"200"}
            _hover={{
                textDecoration: "none",
                bg: colourTheme.colors.LightBlue,
            }}
            _active={{
                bg: "lightgrey",
                boxShadow: "lightgrey",
            }}
            {...props}
        />
    );
};
