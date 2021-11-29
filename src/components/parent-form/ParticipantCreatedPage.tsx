import { Box, Button, Center, Flex, Progress, Stack, Text, VStack } from "@chakra-ui/react";
import { BackButton } from "@components/BackButton";
import { CloseButton } from "@components/CloseButton";
import ApprovedIcon from "@components/icons/ApprovedIcon";
import { Loading } from "@components/Loading";
import Wrapper from "@components/SDCWrapper";
import colourTheme from "@styles/colours";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type ParticipantCreatedPageProps = {
    successful: string;
    styleProps?: Record<string, unknown>;
    session: Session;
    pageNum: number;
    setPageNum: any;
    totalPages: number;
    formPages: JSX.Element[];
    name: string;
};

export const ParticipantCreatedPage: React.FC<ParticipantCreatedPageProps> = ({
    session,
    pageNum,
    setPageNum,
    totalPages,
    formPages,
    successful,
    name,
}): JSX.Element => {
    const router = useRouter();

    const progressBarIncrement = Math.ceil(100 / totalPages);
    const getProgressBarValue = (pageNum) => progressBarIncrement * (pageNum + 1);

    const formPageHeaders = [
        "Participant Information",
        "Participant Information",
        "Participant Emergency Form",
        "Participant Health Form",
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
                                        ? () => setPageNum((prevPage) => Math.max(prevPage - 1, 0))
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
                                    <Box key={idx} display={pageNum === idx ? null : "none"}>
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
                    <VStack mt={120} mb={180}>
                        <ApprovedIcon />
                        <Text fontWeight="700" fontSize="24px" align="center" pt={5}>
                            {successful === "success"
                                ? "Participant added successfully"
                                : "Error: Participant not added successfully"}
                        </Text>
                        <Text maxW={400} textAlign="center" pt={3} pb={9}>
                            {successful === "success" ? (
                                <>
                                    <strong>{name}</strong> has been successfully added as a
                                    participant in your account!
                                </>
                            ) : (
                                "There was an error adding the participant. Please contact us"
                            )}
                        </Text>
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
                            onClick={() => router.reload()}
                        >
                            Add another participant
                        </Button>
                        <Box pt={1} />
                        <Link href="/myaccounts">
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
                                Go to My Account
                            </Button>
                        </Link>
                    </VStack>
                </Center>
            )}
        </Wrapper>
    );
};
