import React from "react";
import { Center, Box, Flex } from "@chakra-ui/react";
import Wrapper from "@components/SDCWrapper";
import { BackButton } from "@components/BackButton";
import { CloseButton } from "@components/CloseButton";
import { ParentEnrolledConfirmationPage } from "@components/registration-form/ParentEnrolledConfirmationPage";
import { Student } from "@prisma/client";

type ParentEnrolledPageProps = {
    styleProps?: Record<string, unknown>;
    session: Record<string, unknown>;
    pageNum: number;
    setPageNum: any;
    formPages: JSX.Element[];
    student: Student;
    classId: number;
    stripeSessionId?: string;
    classPriceId?: string;
};

export const ParentEnrolledFormWrapper: React.FC<ParentEnrolledPageProps> = ({
    session,
    pageNum,
    setPageNum,
    formPages,
    student,
    classId,
    stripeSessionId,
    classPriceId,
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
                <ParentEnrolledConfirmationPage
                    student={student}
                    classId={classId}
                    stripeSessionId={stripeSessionId}
                    classPriceId={classPriceId}
                />
            )}
        </Wrapper>
    );
};
