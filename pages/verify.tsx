import { Box, Center, Text } from "@chakra-ui/react";
import useLocalStorage from "@utils/hooks/useLocalStorage";
import Wrapper from "@components/SDCWrapper";
import MailSentIcon from "@components/icons/MailSentIcon";
import { BackButton } from "@components/BackButton";
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
                <Box width="700px">
                    <Center>
                        <Box>
                            <MailSentIcon />
                        </Box>
                    </Center>
                    <Center>
                        <Text
                            fontWeight="700"
                            fontSize="24px"
                            align="center"
                            mt="10px"
                            width="450px"
                        >
                            {t("signIn.sentTitle")}
                        </Text>
                    </Center>
                    <Center>
                        <Text fontWeight="400" fontSize="16px" align="center" mt="40px">
                            {t("signIn.sentInfo", { email: localStorageEmail })}
                        </Text>
                    </Center>
                    <Center>
                        <Text fontWeight="400" fontSize="14px" mt="60px" color="brand.300">
                            {t("signIn.sentHint")}
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
