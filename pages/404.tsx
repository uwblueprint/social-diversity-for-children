import Wrapper from "@components/SDCWrapper";
import SvgErrorIcon from "@components/icons/ErrorIcon";
import { Button, Box, Center, Heading, Text } from "@chakra-ui/react";

type ComponentProps = {
    session: Record<string, unknown>;
};

export default function Custom404(props: ComponentProps): JSX.Element {
    const goToHome = () => {
        window.location.href = "/";
    };

    return (
        <Wrapper session={props.session}>
            <Center h="80vh" align="center">
                <Box align="center" width="60%">
                    <SvgErrorIcon />
                    <Heading size="xl" margin="3% 0% 3% 0%">
                        Oh no! Page not found.
                    </Heading>
                    <Text size="2xl" marginBottom="3%">
                        Sorry, but the page you are looking for does not exist.
                        Try refreshing the page or hit the button below.
                    </Text>
                    <Button
                        color="white"
                        backgroundColor="#0C53A0"
                        _hover={{ backgroundColor: "#2C6AAD" }}
                        width="50%"
                        padding="10px 12px 10px 12px"
                        onClick={goToHome}
                        borderRadius={100}
                        fontWeight={"200"}
                    >
                        Return to main page
                    </Button>
                </Box>
            </Center>
        </Wrapper>
    );
}
