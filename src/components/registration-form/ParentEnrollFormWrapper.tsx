import React from "react";
import { Center, Box, Flex, Text, Button, VStack } from "@chakra-ui/react";
import Wrapper from "@components/SDCWrapper";
import ApprovedIcon from "@components/icons/ApprovedIcon";
import { BackButton } from "@components/BackButton";
import { CloseButton } from "@components/CloseButton";
import colourTheme from "@styles/colours";
import Link from "next/link";

type ParentEnrolledPageProps = {
    styleProps?: Record<string, unknown>;
    session: Record<string, unknown>;
    pageNum: number;
    setPageNum: any;
    formPages: JSX.Element[];
};

export const ParentEnrolledFormWrapper: React.FC<ParentEnrolledPageProps> = ({
    session,
    pageNum,
    setPageNum,
    formPages,
}): JSX.Element => {
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
                                    display={pageNum === idx ? null : "none"}
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
                        <ApprovedIcon />
                        <Text
                            fontWeight="700"
                            fontSize="24px"
                            align="center"
                            pt={5}
                        >
                            Thank you for registering!
                        </Text>
                        <Text maxW={512} textAlign="center" py={3}>
                            We look forward to see you at our program. Look out
                            for an email from us shortly with more information!
                        </Text>
                        <Link href="/class">
                            <Button
                                bg={"transparent"}
                                borderColor={colourTheme.colors.Blue}
                                borderWidth="2px"
                                borderStyle="solid"
                                px={10}
                                _active={{}}
                                fontWeight={"200"}
                                w="350px"
                                color={colourTheme.colors.Blue}
                            >
                                View upcoming classes
                            </Button>
                        </Link>
                        <Box pt={1} />
                        <Link href="/">
                            <Button
                                color={"white"}
                                bg={colourTheme.colors.Blue}
                                px={10}
                                _hover={{
                                    bg: colourTheme.colors.LightBlue,
                                }}
                                _active={{}}
                                fontWeight={"200"}
                                w="350px"
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
