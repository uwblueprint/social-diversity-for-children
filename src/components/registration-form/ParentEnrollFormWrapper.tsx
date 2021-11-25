import { Box, Center, Flex } from "@chakra-ui/react";
import { BackButton } from "@components/BackButton";
import { CloseButton } from "@components/CloseButton";
import { ParentEnrolledConfirmationPage } from "@components/registration-form/ParentEnrolledConfirmationPage";
import Wrapper from "@components/SDCWrapper";
import { Student } from "@prisma/client";
import { Session } from "next-auth";
import React, { Dispatch, SetStateAction } from "react";

type ParentEnrolledPageProps = {
    styleProps?: Record<string, unknown>;
    session: Session;
    pageNum: number;
    setPageNum: Dispatch<SetStateAction<number>>;
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
