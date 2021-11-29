import React, { Dispatch, SetStateAction } from "react";
import { Center, Box, Flex, Text, Link as ChakraLink, Button, VStack } from "@chakra-ui/react";
import Wrapper from "@components/SDCWrapper";
import { BackButton } from "@components/BackButton";
import { CloseButton } from "@components/CloseButton";
import colourTheme from "@styles/colours";
import { useTranslation } from "react-i18next";
import { Session } from "next-auth";
import Link from "next/link";

type VolunteerEnrolledPageProps = {
    styleProps?: Record<string, unknown>;
    session: Session;
    pageNum: number;
    setPageNum: Dispatch<SetStateAction<number>>;
    formPages: JSX.Element[];
};

export const VolunteerEnrolledFormWrapper: React.FC<VolunteerEnrolledPageProps> = ({
    session,
    pageNum,
    setPageNum,
    formPages,
}): JSX.Element => {
    const { t } = useTranslation(["form", "common"]);

    return (
        <Wrapper session={session}>
            {pageNum < formPages.length ? (
                <Center>
                    <Box w={912}>
                        <Flex alignItems={"center"} justifyContent={"space-between"}>
                            <BackButton
                                onClick={
                                    pageNum > 0
                                        ? () => setPageNum((prevPage) => Math.max(prevPage - 1, 0))
                                        : null
                                }
                            />
                            <CloseButton />
                        </Flex>
                        {formPages.map((formPage, idx) => {
                            return (
                                <Box key={idx} display={pageNum === idx ? null : "none"}>
                                    {formPage}
                                </Box>
                            );
                        })}
                    </Box>
                </Center>
            ) : (
                <Center>
                    <VStack mt={120} mb={180}>
                        {/* need to add check icon? doesn't exist on other pages */}
                        <Text
                            mb={"55px"}
                            maxW={476}
                            fontWeight="700"
                            fontSize="36px"
                            align="center"
                        >
                            {t("form.volunteerSignup")}
                        </Text>
                        <Text maxW={512} textAlign="center">
                            {t("form.volunteerSignupInfo")}
                        </Text>
                        <Center>
                            <Link href="/class">
                                <ChakraLink _hover={{ textDecoration: "none" }} _focus={{}}>
                                    <Button
                                        mt={"55px"}
                                        borderColor={colourTheme.colors.Blue}
                                        border="2px"
                                        width={"364px"}
                                        height={"49px"}
                                        color={colourTheme.colors.Blue}
                                        backgroundColor={colourTheme.colors.white}
                                        px={10}
                                        _active={{}}
                                        fontWeight={"200"}
                                        borderRadius={"6px"}
                                    >
                                        {t("nav.viewUpcoming", {
                                            ns: "common",
                                        })}
                                    </Button>
                                </ChakraLink>
                            </Link>
                        </Center>
                        <Center>
                            <Link href="/">
                                <ChakraLink _hover={{ textDecoration: "none" }} _focus={{}}>
                                    <Button
                                        mt="13px"
                                        width={"364px"}
                                        height={"49px"}
                                        color={"white"}
                                        bg={colourTheme.colors.Blue}
                                        px={10}
                                        _hover={{
                                            bg: colourTheme.colors.LightBlue,
                                        }}
                                        _active={{}}
                                        fontWeight={"400"}
                                        borderRadius={"6px"}
                                    >
                                        {t("nav.browseClasses", {
                                            ns: "common",
                                        })}
                                    </Button>
                                </ChakraLink>
                            </Link>
                        </Center>
                    </VStack>
                </Center>
            )}
        </Wrapper>
    );
};
