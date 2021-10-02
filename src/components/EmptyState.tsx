import React from "react";
import { Box, Center } from "@chakra-ui/react";

type EmptyStateProps = {
    styleProps?: Record<string, unknown>;
    unavailable: string;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
    unavailable,
}): JSX.Element => {
    return <Box></Box>;
};
