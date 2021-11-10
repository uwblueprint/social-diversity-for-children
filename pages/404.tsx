import Wrapper from "@components/SDCWrapper";
import SvgErrorIcon from "@components/icons/ErrorIcon";
import colourTheme from "@styles/colours";
import { Button, Box, Center, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

type ComponentProps = {
    session: Record<string, unknown>;
};

export default function Custom404(props: ComponentProps): JSX.Element {
    return (
        <Wrapper session={props.session}>
            <Center minHeight="85vh" align="center">
                <Box align="center" width="70%">
                    <SvgErrorIcon />
                    <Heading size="lg" mt={12}>
                        Oh no! Page not found.
                    </Heading>
                    <Text size="md" my={9}>
                        Sorry, but the page you are looking for does not exist.
                        Try refreshing the page or hit the button below.
                    </Text>
                    <Link href="/">
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
                        >
                            Return to main page
                        </Button>
                    </Link>
                </Box>
            </Center>
        </Wrapper>
    );
}
