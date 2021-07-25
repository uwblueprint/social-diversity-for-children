import Wrapper from "@components/SDCWrapper";
import { WelcomeToSDC } from "@components/WelcomeToSDC";
import { ProgramList } from "@components/ProgramList";
import { Box, Flex, Divider, Spacer, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession } from "next-auth/client";

type ComponentProps = {
    session: Record<string, unknown>;
};

export default function Component(props: ComponentProps): JSX.Element {
    return (
        <Wrapper session={props.session}>
            <Flex direction="column" pt={4} pb={8}>
                <Box>
                    <WelcomeToSDC session={props.session} />
                </Box>
                <Spacer />

                <Divider
                    orientation="horizontal"
                    marginTop="5%"
                    marginBottom="5%"
                />
                <Heading fontSize="3xl" marginBottom="5%">
                    Browse programs
                </Heading>

                <Box>
                    <ProgramList />
                </Box>
            </Flex>
        </Wrapper>
    );
}

/**
 * getServerSideProps runs before each page is rendered to check to see if a
 * user has already been authenticated
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    return {
        props: { session },
    };
};
