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

export const VolunteerCreatedPage: React.FC<EnrollSuccessProps> = ({
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
                    <VStack mt={120} mb={180} spacing={50}>
                        <Text fontWeight="700" fontSize="24px" align="center">
                            Account created successfully
                        </Text>
                        <Text maxW={512} textAlign="center">
                            Your account has been successfully created. Click
                            the button below to start browsing classes to
                            volunteer for!
                        </Text>
                        <Link
                            _hover={{ textDecoration: "none" }}
                            _focus={{}}
                            href="/"
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
                                borderRadius={100}
                            >
                                Browse Classes
                            </Button>
                        </Link>
                    </VStack>
                </Center>
            )}
        </Wrapper>
    );
};
