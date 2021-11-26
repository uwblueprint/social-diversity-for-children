import React from "react";
import { Box, Center, Flex, FlexProps } from "@chakra-ui/react";
import colourTheme from "@styles/colours";

type EmptyStateProps = FlexProps & {
    styleProps?: Record<string, unknown>;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
    children,
    ...props
}): JSX.Element => {
    return (
        <Flex
            bg={colourTheme.colors.LightGray}
            w="100%"
            py={"40px"}
            px={"64px"}
            mt={5}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            color={colourTheme.colors.Gray}
            {...props}
        >
            <Box w="75%">
                <Center whiteSpace="pre-line" textAlign="center">
                    {children}
                </Center>
            </Box>
        </Flex>
    );
};

export default EmptyState;
