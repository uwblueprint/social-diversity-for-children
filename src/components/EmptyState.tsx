import React from "react";
import { Box, Center } from "@chakra-ui/react";

type EmptyStateProps = {
    styleProps?: Record<string, unknown>;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
    children,
}): JSX.Element => {
    return (
        <Box bg={"#F8F8F8"} w="100%" py={"40px"} px={"64px"} color={"#737373"}>
            <Box>
                <Center whiteSpace="pre-line" textAlign="center">
                    {children}
                </Center>
            </Box>
        </Box>
    );
};
