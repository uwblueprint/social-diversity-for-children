import { Box, Center, Text, Link as ChakraLink } from "@chakra-ui/react";
import useLocalStorage from "@utils/hooks/useLocalStorage";
import Wrapper from "@components/SDCWrapper";
import MailSentIcon from "@components/icons/MailSentIcon";
import { BackButton } from "@components/BackButton";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Verify(): JSX.Element {
    const [localStorageEmail] = useLocalStorage("sdc-email-verification", "");
    const { t } = useTranslation("common");

    return (
        <Wrapper>
            <BackButton />
            <Center h="500px" mt={12} mb={16}>
                <Box width={{ base: undefined, md: "700px" }}>
                    <Center>
                        <Box>
                            <MailSentIcon />
                        </Box>
                    </Center>
                    <Center>
                        <Text fontWeight="700" fontSize="24px" align="center" mt="10px">
                            A verification email has been sent.
                            <br></br>
                            Check your email!
                        </Text>
                    </Center>
                    <Center>
                        <Text fontWeight="400" fontSize="16px" align="center" mt="40px">
                            To confirm your email address, click on the link in the email we sent to{" "}
                            <ChakraLink
                                textDecoration={"underline"}
                                href={`mailto:${localStorageEmail}`}
                            >
                                <u>
                                    <b>{localStorageEmail}</b>
                                </u>
                            </ChakraLink>
                            .<br></br>
                        </Text>
                    </Center>
                    <Center>
                        <Text fontWeight="400" fontSize="14px" mt="60px" color="brand.300">
                            Didn’t get an email? Return to the{" "}
                            <Link href="/login">
                                <ChakraLink _hover={{ textDecoration: "none" }}>
                                    <Text as="u">{t("nav.signIn")}</Text>{" "}
                                </ChakraLink>
                            </Link>
                            page and re-enter a valid email.
                        </Text>
                    </Center>
                </Box>
            </Center>
        </Wrapper>
    );
}

/**
 * getServerSideProps gets props before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
};
