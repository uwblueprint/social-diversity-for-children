import React from "react";
import { Box, Text, Heading, Stack, Button, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import colourTheme from "@styles/colours";
import { useTranslation } from "react-i18next";

const FormButton = (props) => {
    return (
        <Button
            bg={colourTheme.colors.Blue}
            alignSelf="flex-start"
            color={"white"}
            fontWeight="400"
            onClick={props.onClick}
            my={8}
            px={12}
            borderRadius="6px"
        >
            {props.children}
        </Button>
    );
};

type DiscountPageProps = {
    styleProps?: Record<string, unknown>;
    onNext: () => void;
};

export const DiscountPage: React.FC<DiscountPageProps> = ({ onNext }): JSX.Element => {
    const router = useRouter();
    const { t } = useTranslation("form");

    return (
        <>
            <Box>
                <Stack spacing={8} mb={8}>
                    <Text fontWeight="700" fontSize="36px" marginTop="39px">
                        {t("poi.discount")}
                    </Text>
                    <Heading fontSize="22px" fontWeight="900">
                        {t("poi.discountDesc")}
                    </Heading>
                    <Text>{t("poi.discountDesc2")}</Text>
                    <Heading fontSize="22px" fontWeight="900">
                        {t("poi.changed")}
                    </Heading>
                    <Button
                        variant="link"
                        color="black"
                        fontWeight={400}
                        _hover={{ color: colourTheme.colors.Gray }}
                        onClick={() => {
                            router.push("/myaccounts");
                        }}
                        alignSelf="flex-start"
                        alignItems="flex-start"
                        paddingLeft="0"
                    >
                        <Text as="u">{t("poi.update")}</Text>
                    </Button>
                    <FormButton onClick={onNext}>{t("form.next")}</FormButton>
                </Stack>
            </Box>
        </>
    );
};
