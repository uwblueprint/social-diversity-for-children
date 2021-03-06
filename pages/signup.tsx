import { Button, Box, Center, Text } from "@chakra-ui/react";
import Wrapper from "@components/SDCWrapper";
import colourTheme from "@styles/colours";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";
import useMe from "@utils/hooks/useMe";
import { CommonError } from "@components/CommonError";
import { CommonLoading } from "@components/CommonLoading";
import { Session } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

type SignupFormProps = {
    session: Session;
};

/**
 * This is the page that a user will use to either login or register
 * to the SDC platform as a parent of volunteer
 */
export default function SignupForm({ session }: SignupFormProps): JSX.Element {
    const { t } = useTranslation("form");

    const router = useRouter();
    // hook to hold the url to redirect to
    const [url, setUrl] = useState("");

    const isUrlEmpty = () => {
        return url === "";
    };

    const isUrlPath = (path: string) => {
        return url === path;
    };

    // Redirect user if user already signed up
    const { me, isLoading, error } = useMe();

    if (error) {
        return <CommonError cause="cannot fetch user" session={session} />;
    } else if (isLoading) {
        return <CommonLoading session={session} />;
    }

    if (me && me.role) {
        router.push("/");
    }

    return (
        <Wrapper session={session}>
            <Center h="500px" margin="10px">
                <Box width="700px">
                    <Center>
                        <Text fontWeight="700" fontSize="36px" margin="13px">
                            {t("signUp.title")}
                        </Text>
                    </Center>
                    <Center>
                        <Text fontWeight="400" fontSize="18px" mt="18px">
                            {t("signUp.iAm")}
                        </Text>
                    </Center>
                    <Center>
                        <Button
                            _focus={{ boxShadow: null }}
                            backgroundColor="transparent"
                            opacity={isUrlPath("/parent/signup") ? null : "50%"}
                            color={
                                isUrlPath("/parent/signup") ? colourTheme.colors.Blue : "darkgray"
                            }
                            width="366px"
                            height="54px"
                            fontSize="16px"
                            fontWeight="400"
                            border="2px"
                            mt="20px"
                            onClick={() => setUrl("/parent/signup")}
                        >
                            <Text color={colourTheme.colors.Blue}>{t("signUp.parent")}</Text>
                        </Button>
                    </Center>
                    <Center>
                        <Button
                            _focus={{ boxShadow: null }}
                            backgroundColor="transparent"
                            borderColor="brand.400"
                            opacity={isUrlPath("/volunteer/signup") ? null : "50%"}
                            color={
                                isUrlPath("/volunteer/signup")
                                    ? colourTheme.colors.Blue
                                    : "darkgray"
                            }
                            width="366px"
                            height="54px"
                            fontSize="16px"
                            fontWeight="400"
                            border="2px"
                            mt="20px"
                            onClick={() => setUrl("/volunteer/signup")}
                        >
                            <Text color={colourTheme.colors.Blue}>{t("signUp.volunteer")}</Text>
                        </Button>
                    </Center>
                    <Center>
                        <Button
                            _hover={{
                                backgroundColor: isUrlEmpty() ? null : colourTheme.colors.LightBlue,
                            }}
                            backgroundColor={isUrlEmpty() ? "black" : colourTheme.colors.Blue}
                            disabled={isUrlEmpty()}
                            color="white"
                            width="366px"
                            height="44px"
                            fontSize="14px"
                            fontWeight="400"
                            mt="120px"
                            padding="5px"
                            onClick={() => router.push(url)}
                        >
                            {t("form.next")}
                        </Button>
                    </Center>
                </Box>
            </Center>
        </Wrapper>
    );
}

/**
 * getServerSideProps gets the session before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
            ...(await serverSideTranslations(context.locale, ["form", "common"])),
        },
    };
};
