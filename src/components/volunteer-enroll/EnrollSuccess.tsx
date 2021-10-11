import React from "react";
import {
    Center,
    Stack,
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

type EnrollSuccessProps = {
    styleProps?: Record<string, unknown>;
    session: Record<string, unknown>;
    pageNum: number;
    setPageNum: any;
    totalPages: number;
    formPages: JSX.Element[];
};

export const EnrollSuccessPage: React.FC<EnrollSuccessProps> = ({
    session,
    pageNum,
    setPageNum,
    totalPages,
    formPages,
}): JSX.Element => {
    const formPageHeaders = [
        "Submit a Background Check",
        "Update Background Check",
        "Media Release Form",
        "Confirm Program Registration",
    ];
    return (
        <Wrapper session={session}>
            {pageNum < totalPages ? (
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
                        <Text fontWeight="700" fontSize="36px">
                            {formPageHeaders[pageNum]}
                        </Text>
                        <Stack spacing={8}>
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
                        </Stack>
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
                            Thank you for signing up to volunteer!
                        </Text>
                        <Text maxW={512} textAlign="center">
                            We're really excited that you want to volunteer for
                            us. Look out for an email from us shortly with more
                            information!
                        </Text>
                        <Center>
                            <Link
                                _hover={{ textDecoration: "none" }}
                                _focus={{}}
                                href="/"
                            >
                                <Button
                                    mt={"55px"}
                                    borderColor={colourTheme.colors.Blue}
                                    border="2px"
                                    width={"364px"}
                                    height={"49px"}
                                    color={colourTheme.colors.Blue}
                                    backgroundColor={colourTheme.colors.white}
                                    px={10}
                                    _hover={{
                                        bg: colourTheme.colors.LightBlue,
                                    }}
                                    _active={{}}
                                    fontWeight={"200"}
                                    borderRadius={"6px"}
                                >
                                    View upcoming classes
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
                                    Browse Classes
                                </Button>
                            </Link>
                        </Center>
                    </VStack>
                </Center>
            )}
        </Wrapper>
    );
};
