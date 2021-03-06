import React, { useState } from "react";
import {
    Alert,
    Box,
    Button,
    CloseButton,
    Flex,
    Heading,
    Link as ChakraLink,
    Spacer,
    Text,
} from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import InfoIcon from "@components/icons/InfoIcon";
import { roles } from "@prisma/client";
import { UseMeResponse } from "@utils/hooks/useMe";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import checkExpiry from "@utils/checkExpiry";

type MissingDocAlertProps = {
    me?: UseMeResponse["me"];
};

export const MissingDocAlert: React.FC<MissingDocAlertProps> = ({ me }) => {
    const [read, setRead] = useState(false);
    const { t } = useTranslation(["form", "common"]);

    const missingPOI = me && me.role === roles.PARENT && me.parent.proofOfIncomeLink === null;
    const missingCriminalCheck =
        me && me.role === roles.VOLUNTEER && me.volunteer.criminalRecordCheckLink === null;
    const expiredCriminalCheck =
        me &&
        me.role === roles.VOLUNTEER &&
        me.volunteer.criminalRecordCheckLink != null &&
        checkExpiry(me.volunteer.criminalCheckSubmittedAt);

    const InfoCaption = [
        {
            heading: t("poi.submitTitle"),
            desc: t("poi.missing"),
        },
        {
            heading: t("bgc.submitTitle"),
            desc: t("bgc.missing"),
        },
        {
            heading: t("bgc.submitTitle"),
            desc: t("bgc.expired"),
        },
    ];

    return (
        <Box>
            {!read && (missingPOI || missingCriminalCheck || expiredCriminalCheck) && (
                <Alert
                    display="flex"
                    alignItems="center"
                    flexDirection={{ base: "column", lg: "row" }}
                    mt={4}
                    mb={10}
                    padding={{ base: "10px", md: "20px", lg: "30px" }}
                    border="2px"
                    borderRadius="3px"
                    borderColor={colourTheme.colors.Blue}
                    backgroundColor="transparent"
                    status="info"
                >
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Box height={{ base: "35px", md: "50px", lg: "70px" }}>
                            <InfoIcon />
                        </Box>
                        <Box w="60%">
                            {missingPOI && (
                                <Box ml={4}>
                                    <Heading mb={2} size="md" color={colourTheme.colors.Blue}>
                                        {InfoCaption[0].heading}
                                    </Heading>
                                    <Text display="block" color={colourTheme.colors.Gray}>
                                        {InfoCaption[0].desc}
                                    </Text>
                                </Box>
                            )}
                            {missingCriminalCheck && (
                                <Box ml={4}>
                                    <Heading mb={2} size="md" color={colourTheme.colors.Blue}>
                                        {InfoCaption[1].heading}
                                    </Heading>
                                    <Text display="block" color={colourTheme.colors.Gray}>
                                        {InfoCaption[1].desc}
                                    </Text>
                                </Box>
                            )}
                            {expiredCriminalCheck && (
                                <Box ml={4}>
                                    <Heading mb={2} size="md" color={colourTheme.colors.Blue}>
                                        {InfoCaption[2].heading}
                                    </Heading>
                                    <Text display="block" color={colourTheme.colors.Gray}>
                                        {InfoCaption[2].desc}
                                    </Text>
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Spacer />
                    <Box pr={16}>
                        <Flex direction="column" align="center">
                            <Link href="/myaccounts">
                                <ChakraLink _hover={{ textDecoration: "none" }}>
                                    <Button
                                        color="white"
                                        backgroundColor={colourTheme.colors.Blue}
                                        _hover={{
                                            backgroundColor: colourTheme.colors.LightBlue,
                                        }}
                                        size="sm"
                                        py={5}
                                        width="120%"
                                        textDecoration="none"
                                        borderRadius="6px"
                                        fontWeight={"200"}
                                    >
                                        {t("nav.viewDetails", { ns: "common" })}
                                    </Button>
                                </ChakraLink>
                            </Link>
                        </Flex>
                    </Box>
                    <CloseButton
                        color={colourTheme.colors.Blue}
                        position="absolute"
                        as="button"
                        right="8px"
                        top="8px"
                        onClick={() => setRead(true)}
                    />
                </Alert>
            )}
        </Box>
    );
};
