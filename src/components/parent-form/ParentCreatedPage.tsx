import {
    Box,
    Button,
    Center,
    Flex,
    Link as ChakraLink,
    Progress,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { BackButton } from "@components/BackButton";
import { CloseButton } from "@components/CloseButton";
import ApprovedIcon from "@components/icons/ApprovedIcon";
import { Loading } from "@components/Loading";
import Wrapper from "@components/SDCWrapper";
import colourTheme from "@styles/colours";
import { Session } from "next-auth";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";

type ParentCreatedPageProps = {
    successful: string;
    styleProps?: Record<string, unknown>;
    session: Session;
    pageNum: number;
    setPageNum: any;
    totalPages: number;
    formPages: JSX.Element[];
};

export const ParentCreatedPage: React.FC<ParentCreatedPageProps> = ({
    session,
    pageNum,
    setPageNum,
    totalPages,
    formPages,
    successful,
}): JSX.Element => {
    const { t } = useTranslation(["form", "common"]);

    const progressBarIncrement = Math.ceil(100 / totalPages);
    const getProgressBarValue = (pageNum) => progressBarIncrement * (pageNum + 1);

    const formPageHeaders = [
        t("account.participantInformation", { ns: "common" }),
        t("account.participantInformation", { ns: "common" }),
        t("label.emergencyForm"),
        t("label.healthForm"),
        t("label.guardianInformation"),
        t("poi.title"),
        t("signUp.hearAboutUsTitle"),
    ];
    return (
        <Wrapper session={session}>
            {pageNum < totalPages ? (
                <Center>
                    <Box w={912}>
                        <Flex alignItems={"center"} justifyContent={"space-between"}>
                            <BackButton
                                onClick={
                                    pageNum > 0
                                        ? () =>
                                              setPageNum((prevPage) =>
                                                  Math.max(prevPage - 1, 0),
                                              )
                                        : null
                                }
                            />
                            <CloseButton />
                        </Flex>
                        <Text fontWeight="700" fontSize="36px">
                            {formPageHeaders[pageNum]}
                        </Text>
                        <Stack spacing={8}>
                            <Progress
                                value={getProgressBarValue(pageNum)}
                                size="sm"
                                color={colourTheme.colors.Blue}
                                mt={8}
                                mb={6}
                            />
                            {formPages.map((formPage, idx) => {
                                return (
                                    <Box
                                        key={idx}
                                        display={pageNum === idx ? null : "none"}
                                    >
                                        {formPage}
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Box>
                </Center>
            ) : successful === "pending" ? (
                <Loading />
            ) : (
                <Center>
                    <VStack mt={120} mb={180} spacing={50}>
                        <ApprovedIcon />
                        <Text fontWeight="700" fontSize="24px" align="center">
                            {successful === "success"
                                ? t("form.accountCreated")
                                : "Error: Account not Created"}
                        </Text>
                        <Text maxW={512} textAlign="center">
                            {successful === "success"
                                ? t("form.accountCreatedInfo")
                                : "There was an error creating your account. Please contact us"}
                        </Text>
                        <Link href="/">
                            <ChakraLink _hover={{ textDecoration: "none" }} _focus={{}}>
                                <Button
                                    color={"white"}
                                    bg={"#0C53A0"}
                                    px={10}
                                    _hover={{
                                        bg: colourTheme.colors.LightBlue,
                                    }}
                                    _active={{}}
                                    fontWeight={"200"}
                                    borderRadius="6px"
                                >
                                    {t("nav.browseClasses", { ns: "common" })}
                                </Button>
                            </ChakraLink>
                        </Link>
                    </VStack>
                </Center>
            )}
        </Wrapper>
    );
};
