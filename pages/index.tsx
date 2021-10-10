import Wrapper from "@components/SDCWrapper";
import { WelcomeToSDC } from "@components/WelcomeToSDC";
import { ProgramList } from "@components/ProgramList";
import {
    Center,
    Box,
    Flex,
    Divider,
    Spacer,
    Heading,
    Spinner,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession, GetSessionOptions } from "next-auth/client";
import CardInfoUtil from "utils/cardInfoUtil";
import useSWR from "swr";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { EmptyState } from "@components/EmptyState";

type ComponentProps = {
    session: Record<string, unknown>;
};

export default function Component(props: ComponentProps): JSX.Element {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: apiResponse, error } = useSWR("/api/program", fetcher);
    if (error) {
        return <Box>{"An error has occurred: " + error.toString()}</Box>;
    }
    // if no programs are available, return value is []
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
                    {programCardInfos.length === 0 ? (
                        <EmptyState>
                            {
                                "There are currently no programs available to register for.\nCome back shortly to see the programs we have to offer for the next term!"
                            }
                        </EmptyState>
                    ) : programCardInfos ? (
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
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    return {
        props: {
            session,
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
};
