import React, { Dispatch, SetStateAction } from "react";
import {
    Center,
    Stack,
    Box,
    Flex,
    Progress,
    Text,
    Link as ChakraLink,
    Button,
    VStack,
} from "@chakra-ui/react";
import Wrapper from "@components/SDCWrapper";
import ApprovedIcon from "@components/icons/ApprovedIcon";
import { BackButton } from "@components/BackButton";
import { CloseButton } from "@components/CloseButton";
import colourTheme from "@styles/colours";
import Link from "next/link";
import { Loading } from "@components/Loading";
import { useTranslation } from "react-i18next";
import { Session } from "next-auth";

type VolunteerCreatedPageProps = {
    successful: string;
    styleProps?: Record<string, unknown>;
    session: Session;
    pageNum: number;
    setPageNum: Dispatch<SetStateAction<number>>;
    totalPages: number;
    formPages: JSX.Element[];
};

export const VolunteerCreatedPage: React.FC<VolunteerCreatedPageProps> = ({
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
        t("label.volunteerInformation"),
        t("label.volunteerPersonalDetails"),
        t("bgc.title"),
        t("label.volunteerPersonalDetails"),
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
                                ? t("form.volunteerCreatedInfo")
                                : "There was an error creating your account. Please contact us"}
                        </Text>
                        <Link href="/">
                            <ChakraLink
                                _hover={{ textDecoration: "none" }}
                                _focus={{}}
                            >
                                <Button
                                    color={"white"}
                                    bg={colourTheme.colors.Blue}
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
