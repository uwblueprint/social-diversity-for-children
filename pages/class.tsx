import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, GetSessionOptions } from "next-auth/client";
import Wrapper from "@components/SDCWrapper";
import { BackButton } from "@components/BackButton";
import { EnrollmentList } from "@components/EnrollmentList";
import { VolunteeringList } from "@components/VolunteeringList";
import { roles } from ".prisma/client";

type ClassProps = {
    session: Record<string, unknown>;
};

/**
 * This is the page that a user will see their registered classes
 */
function Class({ session }: ClassProps): JSX.Element {
    return (
        <Wrapper session={session}>
            <BackButton />
            <Flex direction="column" pt={4} pb={8}>
                <Flex align="center">
                    <Heading mb={8}>My Classes</Heading>
                </Flex>
                {session.role === roles.PARENT ? <EnrollmentList /> : null}
                {session.role === roles.VOLUNTEER ? <VolunteeringList /> : null}
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

    if (!session || !session.role) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};
