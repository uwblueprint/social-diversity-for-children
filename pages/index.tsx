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
import { getSession } from "next-auth/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { EmptyState } from "@components/EmptyState";
import { useTranslation } from "next-i18next";
import usePrograms from "@utils/hooks/usePrograms";
import { Loading } from "@components/Loading";
import { useRouter } from "next/router";
import { locale } from "@prisma/client";
import useMe from "@utils/hooks/useMe";
import { MissingDocAlert } from "@components/MissingDocAlert";

type ComponentProps = {
    session: Record<string, unknown>;
};

export default function Component(props: ComponentProps): JSX.Element {
    const { t } = useTranslation("common");
    const router = useRouter();
    const { me } = useMe();

    const {
        programs: programCardInfos,
        isLoading,
        error,
    } = usePrograms(router.locale as locale);
    if (error) {
        return <Box>{"An error has occurred: " + error.toString()}</Box>;
    }
    if (isLoading) {
        return <Loading />;
    }

    return (
        <Wrapper session={props.session}>
            <Flex direction="column" pt={4} pb={8}>
                <Box>
                    <MissingDocAlert me={me} />
                    <WelcomeToSDC session={props.session} />
                </Box>
                <Spacer />

                <Divider
                    orientation="horizontal"
                    marginTop="5%"
                    marginBottom="5%"
                />
                <Heading fontSize="3xl" marginBottom="5%">
                    {t("home.browseProgram")}
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
