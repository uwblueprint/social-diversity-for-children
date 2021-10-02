import React from "react";
import { Box, Center } from "@chakra-ui/react";

type EmptyStateProps = {
    styleProps?: Record<string, unknown>;
    unavailable: string;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
    unavailable,
}): JSX.Element => {
    return (
        <Box bg={"#F8F8F8"} w="100%" py={"40px"} px={"64px"} color={"#737373"}>
            <Box>
                <Center>
                    There are currently no {unavailable} to register for.
                </Center>
                <Center>
                    Come back shortly to see the programs we have to offer for
                    the next term!
                </Center>
            </Box>
        </Box>
    );
};
