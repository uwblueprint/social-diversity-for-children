import Wrapper from "@components/SDCWrapper";
import SvgErrorIcon from "@components/icons/ErrorIcon";
import colourTheme from "@styles/colours";
import { Button, Box, Center, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Session } from "next-auth";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getSession } from "next-auth/client";

type ComponentProps = {
    session: Session;
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

/**
 * getServerSideProps gets props before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    return {
        props: {
            session,
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
};
