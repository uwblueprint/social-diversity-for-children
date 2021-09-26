import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, GetSessionOptions } from "next-auth/client";
import Wrapper from "@components/SDCWrapper";
import { BackButton } from "@components/BackButton";
import { EnrollmentList } from "@components/EnrollmentList";
import useSWR from "swr";
import CardInfoUtil from "@utils/cardInfoUtil";

type ClassProps = {
    session: Record<string, unknown>;
};

function Class({ session }: ClassProps): JSX.Element {
    // TODO: make a generic helper method for SWR fetch
    const fetcher = (url) => fetch(url).then((r) => r.json());
    const { data: enrollmentListResponse, error: enrollmentListError } = useSWR(
        "/api/enroll/child",
        fetcher,
    );
    if (enrollmentListError) {
        return (
            // This should really route to some error page instead
            <Text>An error has occurred. {enrollmentListError.toString()}</Text>
        );
    }

    const enrollmentCardInfos = enrollmentListResponse
        ? CardInfoUtil.getEnrollmentCardInfos(enrollmentListResponse.data)
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
