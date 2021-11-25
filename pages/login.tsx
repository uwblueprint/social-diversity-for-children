import {
    Box,
    Button,
    Center,
    FormControl,
    Input,
    Text,
    useControllableState,
} from "@chakra-ui/react";
import Wrapper from "@components/SDCWrapper";
import useLocalStorage from "@utils/hooks/useLocalStorage";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession, signIn } from "next-auth/client";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import isEmail from "validator/lib/isEmail";

/**
 * This is the page that a user will use to either login or register
 * to the SDC platform
 */
export default function Login(): JSX.Element {
    // hook to hold the user's email
    const [email, setEmail] = useState("");

    // save the email into localstorage for email verification page
    const [, setLocalStorageEmail] = useLocalStorage(
        "sdc-email-verification",
        "",
    );
    const [value, setValue] = useControllableState({ defaultValue: false });

    // signInWithEmail sends a login request to the user's email
    const signInWithEmail = () => {
        signIn("email", { email });
    };

    const { t } = useTranslation("common");

    return (
        <Wrapper>
            <Center h="500px">
                <Box width="700px">
                    <Center>
                        <Text fontWeight="700" fontSize="36px">
                            {t("home.signIn")}
                        </Text>
                    </Center>
                    <Center>
                        <Text fontWeight="400" fontSize="16px" mt="20px">
                            Registration for Summer 2021 classes begin June 31,
                            2021
                        </Text>
                    </Center>
                    <Center>
                        <Text fontWeight="400" fontSize="16px" mt="50px">
                            Email Address
                        </Text>
                    </Center>
                    <FormControl id="email">
                        <Center>
                            <Input
                                width="366px"
                                type="email"
                                placeholder="Enter email"
                                textAlign="center"
                                mt="5px"
                                onChange={(e) => {
                                    if (isEmail(e.target.value)) {
                                        setEmail(e.target.value);
                                    } else {
                                        setEmail(null);
                                    }
                                }}
                            />
                        </Center>
                    </FormControl>
                    <Center>
                        {!email ? (
                            <Button
                                isDisabled
                                backgroundColor="#202020"
                                color="brand.200"
                                width="366px"
                                fontSize="12px"
                                fontWeight="400"
                                mt="30px"
                                _hover={{}}
                                borderRadius="6px"
                            >
                                Please enter a valid email to continue.
                            </Button>
                        ) : !value ? (
                            <Button
                                bg="#0C53A0"
                                color="brand.200"
                                width="366px"
                                fontSize="12px"
                                fontWeight="400"
                                mt="20px"
                                _hover={{
                                    bg: "#2C6AAD",
                                }}
                                borderRadius="6px"
                                onClick={() => {
                                    setValue(!value);
                                    setLocalStorageEmail(email);
                                    signInWithEmail();
                                }}
                                _active={{}}
                            >
                                Continue
                            </Button>
                        ) : (
                            <Button
                                isLoading
                                loadingText="Loading"
                                bg="#2C6AAD"
                                color="brand.200"
                                width="366px"
                                fontSize="12px"
                                fontWeight="400"
                                mt="20px"
                                borderRadius="6px"
                            />
                        )}
                    </Center>
                    <Center>
                        <Text
                            fontWeight="400"
                            fontSize="14px"
                            mt="70px"
                            color="brand.300"
                        >
                            {t("signIn.firstTime")}
                        </Text>
                    </Center>
                </Box>
            </Center>
        </Wrapper>
    );
}

/**
 * getServerSideProps runs before this page is rendered to check to see if a
 * user has already been authenticated.
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    // if the user is already authenticated redirect them to the home page
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    // if the user is not authenticated - continue to the page as normal
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
};
