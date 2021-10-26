import React from "react";
import { Box, Text, Heading, OrderedList, ListItem } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type CriminalPageProps = {
    styleProps?: Record<string, unknown>;
};

export const CriminalPage: React.FC<CriminalPageProps> = (): JSX.Element => {
    const { t } = useTranslation("form");
    return (
        <>
            <Box maxW="55rem">
                <Text margin="10px" fontSize="16px" fontWeight="200">
                    {t("bgc.desc1")}
                </Text>
                <Text margin="10px" fontSize="16px" fontWeight="200">
                    {t("bgc.desc2")}
                </Text>
                <Heading fontSize="22px" mt={10} fontWeight="900">
                    {t("bgc.instruction")}
                    <OrderedList margin="10px" fontSize="16px" fontWeight="400">
                        <ListItem mx="20px">{t("bgc.instruction1")}</ListItem>
                        <ListItem mx="20px">{t("bgc.instruction2")}</ListItem>
                        <ListItem mx="20px">{t("bgc.instruction3")}</ListItem>
                        <ListItem mx="20px">{t("bgc.instruction4")}</ListItem>
                    </OrderedList>
                </Heading>
            </Box>
        </>
    );
};
