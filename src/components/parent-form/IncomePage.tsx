import React from "react";
import { Box, Text, Heading, UnorderedList, ListItem, OrderedList } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type IncomePageProps = {
    styleProps?: Record<string, unknown>;
};

export const IncomePage: React.FC<IncomePageProps> = (): JSX.Element => {
    const { t } = useTranslation("form");
    const PROOF_OF_INCOME_EXAMPLES = [t("poi.taxNotice"), t("poi.paystub"), t("poi.etc")];

    const UPLOADING_PROOF_OF_INCOME = [
        t("poi.instruction1"),
        t("poi.instruction2"),
        t("poi.instruction3"),
        t("poi.instruction4"),
    ];

    return (
        <>
            <Box maxW="55rem">
                <Text fontSize="16px" fontWeight="200" mb="60px">
                    {t("poi.desc")}
                </Text>
                <Heading fontSize="22px" fontWeight="900">
                    {t("poi.example")}
                </Heading>
                <br />
                <UnorderedList margin="10px" fontSize="16px" fontWeight="400">
                    {PROOF_OF_INCOME_EXAMPLES.map((poi, idx) => (
                        <ListItem key={idx} mx="20px">
                            {poi}
                        </ListItem>
                    ))}
                </UnorderedList>
                <br />
                <Heading fontSize="22px" fontWeight="900">
                    {t("poi.instruction")}
                </Heading>
                <br />
                <OrderedList margin="10px" fontSize="16px" fontWeight="400">
                    {UPLOADING_PROOF_OF_INCOME.map((poi, idx) => (
                        <ListItem key={idx} mx="20px">
                            {poi}
                        </ListItem>
                    ))}
                </OrderedList>
            </Box>
        </>
    );
};
