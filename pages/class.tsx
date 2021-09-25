import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, GetSessionOptions } from "next-auth/client";
import SDCWrapper from "@components/SDCWrapper";
import { BackButton } from "@components/BackButton";

type ClassProps = {
    session: Record<string, unknown>;
};

function Class({ session }: ClassProps): JSX.Element {
    return (
        <SDCWrapper session={session}>
            <BackButton />
            <Flex direction="column" pt={4} pb={8}>
                <Flex align="center">
                    <Heading>My Classes</Heading>
                </Flex>
                <Heading mt="10" size="sm">
                    Upcoming Classes
                </Heading>
            </Flex>
        </SDCWrapper>
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
