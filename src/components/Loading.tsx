import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import React from "react";

/**
 * Loading spinner component
 */
export const Loading: React.FC = () => {
    return (
        <Flex justifyContent="center" alignItems="center" minH="40vh">
            <Spinner size="xl" />
        </Flex>
    );
};
