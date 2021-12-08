import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import Link from "next/link";
import { ApprovedIcon, InfoIcon, PendingIcon } from "@components/icons";
import convertToShortDateString from "@utils/convertToShortDateString";
import { locale } from "@prisma/client";
import { useTranslation } from "next-i18next";

type CriminalCheckProps = {
    link: string;
    approved: boolean;
    submitDate?: Date;
};

export const CriminalCheck: React.FC<CriminalCheckProps> = ({
    link,
    approved,
    submitDate, // add new prop for date ? or a check of some sorts
}): JSX.Element => {
    const { t } = useTranslation(["form", "common"]);

    let description;
    let status;
    let icon;

    if (approved) {
        status = "approved";
        description = t("account.bgc", {
            ns: "common",
            context: status,
        });
        icon = <ApprovedIcon />;
    } else if (link == null) {
        description = t("bgc.missing");
        icon = <InfoIcon />;
    } //else if ()
    // add else if statement here for if date added > 1 year -> expired
    else {
        status = "pending";
        description = t("account.bgc", {
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
            <Link href="/document-upload?type=criminal-check&redirect=/myaccounts">
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
                    {t("bgc.upload")}
                </Button>
            </Link>
        </Box>
    );
};
