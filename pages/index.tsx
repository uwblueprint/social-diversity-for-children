import Wrapper from "@components/SDCWrapper";
import { WelcomeToSDC } from "@components/WelcomeToSDC";
import { ProgramList } from "@components/ProgramList";
import {
    Box,
    Flex,
    Divider,
    Spacer,
    Heading,
    Spinner,
    Center,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession, GetSessionOptions } from "next-auth/client";
import useSWR from "swr";
import CardInfoUtil from "utils/cardInfoUtil";

type ComponentProps = {
    session: Record<string, unknown>;
};

export default function Component(props: ComponentProps): JSX.Element {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: apiResponse, error } = useSWR("/api/program", fetcher);
    if (error) {
        return <Box>{"An error has occurred: " + error.toString()}</Box>;
    }
    const programCardInfos = apiResponse
        ? CardInfoUtil.getProgramCardInfos(apiResponse.data)
        : [];
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
                    {programCardInfos ? (
                        <ProgramList cardInfo={programCardInfos} />
                    ) : (
                        <Center>
                            <Spinner size="xl" />
                        </Center>
                    )}
                </Box>
            </Flex>
        </Wrapper>
    );
}

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
