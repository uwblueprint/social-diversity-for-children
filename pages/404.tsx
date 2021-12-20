import Wrapper from "@components/SDCWrapper";
import SvgErrorIcon from "@components/icons/ErrorIcon";
import colourTheme from "@styles/colours";
import { Button, Box, Center, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Custom404(): JSX.Element {
    const { t } = useTranslation("common");

    return (
        <Wrapper>
            <Center minHeight="85vh" align="center">
                <Box align="center" width="70%">
                    <SvgErrorIcon />
                    <Heading size="lg" mt={12}>
                        {t("404.title")}
                    </Heading>
                    <Text size="md" my={9}>
                        {t("404.subtitle")}
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
                            {t("404.return")}
                        </Button>
                    </Link>
                </Box>
            </Center>
        </Wrapper>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
        },
    };
};
