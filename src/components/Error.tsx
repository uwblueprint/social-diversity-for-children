import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import { useRouter } from "next/router";
import React from "react";
import SvgErrorIcon from "./icons/ErrorIcon";

export type ErrorProps = {
    cause: string;
};

/**
 * Error component
 */
export const Error: React.FC<ErrorProps> = ({ cause }) => {
    const router = useRouter();

    return (
        <Center h="100vh" align="center">
            <Box align="center" width="70%">
                <SvgErrorIcon />
                <Heading size="lg" mt={12}>
                    Oh no! An Error has occurred.
                </Heading>
                <Text size="md" my={9}>
                    Sorry, but looks like the page ran into an error: {cause}.
                    Try refreshing the page or hit the button below.
                </Text>
                <Button
                    color="white"
                    backgroundColor={colourTheme.colors.Blue}
                    _hover={{
                        backgroundColor: colourTheme.colors.LightBlue,
                    }}
                    size="sm"
                    py={5}
                    width="50%"
                    borderRadius="6px"
                    fontWeight={"200"}
                    onClick={router.back}
                >
                    Go back
                </Button>
            </Box>
        </Center>
    );
};
