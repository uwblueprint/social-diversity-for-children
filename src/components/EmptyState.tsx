import React from "react";
import { Box, Center } from "@chakra-ui/react";
import colourTheme from "@styles/colours";

type EmptyStateProps = {
    styleProps?: Record<string, unknown>;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
    children,
}): JSX.Element => {
    return (
        <Box
            bg={colourTheme.colors.LightGray}
            w="100%"
            py={"40px"}
            px={"64px"}
            color={colourTheme.colors.Gray}
        >
            <Box>
                <Center whiteSpace="pre-line" textAlign="center">
                    {children}
                </Center>
            </Box>
        </Box>
    );
};
