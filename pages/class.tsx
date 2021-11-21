import { roles } from ".prisma/client";
import { Flex, Heading } from "@chakra-ui/react";
import { BackButton } from "@components/BackButton";
import { CommonError } from "@components/CommonError";
import { CommonLoading } from "@components/CommonLoading";
import { EnrollmentList } from "@components/EnrollmentList";
import { Loading } from "@components/Loading";
import Wrapper from "@components/SDCWrapper";
import { VolunteeringList } from "@components/VolunteeringList";
import { WaitlistList } from "@components/WaitlistList";
import useMe from "@utils/hooks/useMe";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React from "react";

type ClassProps = {
    session: Record<string, unknown>;
};

/**
 * This is the page that a user will see their registered classes
 */
function Class({ session }: ClassProps): JSX.Element {
    const { me, isLoading: isMeLoading, error: meError } = useMe();
    const router = useRouter();

    if (meError) {
        return <CommonError session={session} cause="cannot fetch user" />;
    } else if (isMeLoading) {
        return <CommonLoading session={session} />;
    }

    // Stop and inform user to fill out information
    if (me.role === null) {
        router.push("/signup");
        return <Loading />;
    }

    return (
        <Wrapper session={session}>
            <BackButton />
            <Flex direction="column" pt={4} pb={8}>
                <Flex align="center">
                    <Heading mb={8}>My Classes</Heading>
                </Flex>
                {me.role === roles.PARENT ? <EnrollmentList /> : null}
                {me.role === roles.VOLUNTEER ? <VolunteeringList /> : null}
            </Flex>
            <Flex direction="column" pt={4} pb={8}>
                <Flex align="center">
                    <Heading mb={8}>My Waitlist</Heading>
                </Flex>
                {me.role === roles.PARENT ? <WaitlistList /> : null}
            </Flex>
        </Wrapper>
    );
}

export default Class;

/**
 * getServerSideProps gets the session before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
};
