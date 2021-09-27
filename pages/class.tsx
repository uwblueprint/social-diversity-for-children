import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, GetSessionOptions } from "next-auth/client";
import Wrapper from "@components/SDCWrapper";
import { BackButton } from "@components/BackButton";
import { EnrollmentList } from "@components/EnrollmentList";
import CardInfoUtil from "@utils/cardInfoUtil";
import useParentRegistrations from "@utils/useParentRegistration";

type ClassProps = {
    session: Record<string, unknown>;
};

function Class({ session }: ClassProps): JSX.Element {
    const { enrollments, error } = useParentRegistrations();

    if (error) {
        return (
            // This should really route to some error page instead
            <Text>An error has occurred. {error.toString()}</Text>
        );
    }

    const enrollmentCardInfos = enrollments
        ? CardInfoUtil.getEnrollmentCardInfos(enrollments.data)
        : [];

    return (
        <Wrapper session={session}>
            <BackButton />
            <Flex direction="column" pt={4} pb={8}>
                <Flex align="center">
                    <Heading>My Classes</Heading>
                </Flex>
                <Heading mt={10} mb={5} size="sm">
                    Upcoming classes
                </Heading>
                <EnrollmentList enrollmentInfo={enrollmentCardInfos} />
            </Flex>
        </Wrapper>
    );
}

export default Class;

/**
 * getServerSideProps gets the session before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (
    context: GetSessionOptions,
) => {
    // obtain the next auth session
    const session = await getSession(context);

    return {
        props: { session },
    };
};
