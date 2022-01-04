import React from "react";
import { Box, Button, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import Link from "next/link";
import { ApprovedIcon, InfoIcon, PendingIcon } from "@components/icons";
import convertToShortDateString from "@utils/convertToShortDateString";
import { locale } from "@prisma/client";
import { useTranslation } from "next-i18next";
import checkExpiry from "@utils/checkExpiry";
import useFileRetrieve from "@utils/hooks/useFileRetrieve";
import { FileType } from "@utils/enum/filetype";

type CriminalCheckProps = {
    file: string;
    approved: boolean;
    submitDate?: Date;
};

export const CriminalCheck: React.FC<CriminalCheckProps> = ({
    file,
    approved,
    submitDate,
}): JSX.Element => {
    const { t } = useTranslation(["form", "common"]);
    const { url: docLink } = useFileRetrieve(FileType.CRIMINAL_CHECK, file);

    let description;
    let status;
    let icon;

    if (approved && checkExpiry(submitDate)) {
        status = "expired";
        description = t("account.bgc", {
            ns: "common",
            context: status,
        });
        icon = <InfoIcon />;
    } else if (approved) {
        status = "approved";
        description = t("account.bgc", {
            ns: "common",
            context: status,
        });
        icon = <ApprovedIcon />;
    } else if (file == null) {
        description = t("bgc.missing");
        icon = <InfoIcon />;
    } else if (approved === null) {
        status = "pending";
        description = t("account.bgc", {
            ns: "common",
            context: status,
        });
        icon = <PendingIcon />;
    } else {
        status = "declined";
        description = t("account.bgc", {
            ns: "common",
            context: status,
        });
        icon = <InfoIcon />;
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
                {file == null ? null : (
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
                        <Flex>
                            <Text pr={1}>
                                {t("account.document", {
                                    ns: "common",
                                })}
                                :{" "}
                            </Text>
                            <ChakraLink href={docLink} isExternal>
                                {file}
                            </ChakraLink>
                        </Flex>
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
