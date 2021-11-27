import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import colourTheme from "@styles/colours";

/**
 * Displays a pres-styled primary button used across the platform
 */
export const PrimaryButton: React.FC<ButtonProps> = (props) => {
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

/**
 * Displays a pres-styled secondary button used across the platform
 */
export const SecondaryButton: React.FC<ButtonProps> = (props) => {
    return (
        <Button
            bg="white"
            color={colourTheme.colors.Blue}
            mx={"auto"}
            my={2}
            fontWeight={"200"}
            _focus={{ boxShadow: null }}
            _hover={{
                bg: colourTheme.colors.CatskillWhite,
            }}
            _active={{
                bg: "lightgrey",
                boxShadow: "lightgrey",
            }}
            lineHeight="24px"
            fontSize="16px"
            textColor={colourTheme.colors.Blue}
            border={`2px solid ${colourTheme.colors.Blue}`}
            {...props}
        />
    );
};
