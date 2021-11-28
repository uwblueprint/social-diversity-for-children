import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import Link from "next/link";
import { ApprovedIcon, InfoIcon, PendingIcon } from "@components/icons";
import convertToShortDateString from "@utils/convertToShortDateString";
import { locale } from "@prisma/client";
import { useTranslation } from "react-i18next";

type ProofOfIncomeProps = {
    link: string;
    approved: boolean;
    submitDate?: Date;
};

export const ProofOfIncome: React.FC<ProofOfIncomeProps> = ({
    link,
    approved,
    submitDate,
}): JSX.Element => {
    const { t } = useTranslation(["form", "common"]);

    let description;
    let status;
    let icon;

    if (approved) {
        status = "approved";
        description = t("account.poi", {
            ns: "common",
            context: status,
        });
        icon = <ApprovedIcon />;
    } else if (link == null) {
        description = t("poi.missing");
        icon = <InfoIcon />;
    } else {
        status = "pending";
        description = t("account.poi", {
            ns: "common",
            context: status,
        });
        icon = <PendingIcon />;
    }

    return (
        <Box>
            <Flex alignItems="center">
                <Box pr={8}>{icon}</Box>
                <Box>
                    <Text color={colourTheme.colors.Blue} fontWeight={700}>
                        {description}
                    </Text>
                </Box>
            </Flex>
            <Box pl={120} my={5} color={colourTheme.colors.Gray}>
                {link == null ? null : (
                    <>
                        <Text>
                            {t("account.status", {
                                ns: "common",
                                context: status,
                            })}
                        </Text>
                        <Text>
                            {t("account.dateSubmitted", {
                                ns: "common",
                                date: convertToShortDateString(submitDate, locale.en, true),
                            })}
                        </Text>
                    </>
                )}
            </Box>
            <Link href="/document-upload?type=income-proof&redirect=/myaccounts">
                <Button
                    backgroundColor="#0C53A0"
                    borderColor="brand.400"
                    width="100%"
                    height="54px"
                    fontSize="16px"
                    fontWeight="400"
                    color="white"
                    border="1px"
                    mt="20px"
                >
                    {t("poi.upload")}
                </Button>
            </Link>
        </Box>
    );
};
