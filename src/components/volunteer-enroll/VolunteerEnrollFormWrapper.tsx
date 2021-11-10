import React from "react";
import {
    Center,
    Box,
    Flex,
    Text,
    Link,
    Button,
    VStack,
} from "@chakra-ui/react";
import Wrapper from "@components/SDCWrapper";
import { BackButton } from "@components/BackButton";
import { CloseButton } from "@components/CloseButton";
import colourTheme from "@styles/colours";
import { useTranslation } from "react-i18next";

type VolunteerEnrolledPageProps = {
    styleProps?: Record<string, unknown>;
    session: Record<string, unknown>;
    pageNum: number;
    setPageNum: any;
    formPages: JSX.Element[];
};

export const VolunteerEnrolledFormWrapper: React.FC<VolunteerEnrolledPageProps> =
    ({ session, pageNum, setPageNum, formPages }): JSX.Element => {
        const { t } = useTranslation("form");

        return (
            <Wrapper session={session}>
                {pageNum < formPages.length ? (
                    <Center>
                        <Box w={912}>
                            <Flex
                                alignItems={"center"}
                                justifyContent={"space-between"}
                            >
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
                            {formPages.map((formPage, idx) => {
                                return (
                                    <Box
                                        key={idx}
                                        display={
                                            pageNum === idx ? null : "none"
                                        }
                                    >
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
                                We're really excited that you want to volunteer
                                for us. Look out for an email from us shortly
                                with more information!
                            </Text>
                            <Center>
                                <Link
                                    _hover={{ textDecoration: "none" }}
                                    _focus={{}}
                                    href="/class"
                                >
                                    <Button
                                        mt={"55px"}
                                        borderColor={colourTheme.colors.Blue}
                                        border="2px"
                                        width={"364px"}
                                        height={"49px"}
                                        color={colourTheme.colors.Blue}
                                        backgroundColor={
                                            colourTheme.colors.white
                                        }
                                        px={10}
                                        _active={{}}
                                        fontWeight={"200"}
                                        borderRadius={"6px"}
                                    >
                                        {t("form.viewUpcoming")}
                                    </Button>
                                </Link>
                            </Center>
                            <Center>
                                <Link
                                    _hover={{ textDecoration: "none" }}
                                    _focus={{}}
                                    href="/"
                                >
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
                                        {t("form.browseClasses")}
                                    </Button>
                                </Link>
                            </Center>
                        </VStack>
                    </Center>
                )}
            </Wrapper>
        );
    };
