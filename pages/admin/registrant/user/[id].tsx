import React, { useState, useEffect } from "react";
import Wrapper from "@components/AdminWrapper";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import useUser from "@utils/hooks/useUser";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Loading } from "@components/Loading";

import { Button, VStack, Icon, Link, Text, HStack } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import { MdPerson, MdDescription } from "react-icons/md";
import FileDownloadCard from "@components/fileDownloadCard";
import { Volunteer } from ".prisma/client";
import EmptyState from "@components/EmptyState";

const FILE_PATH = "criminal-check";

type AdminProps = {
    volunteerName: string;
    volunteerEmail: string;
    volunteer: Volunteer;
    session: Record<string, unknown>;
};

export default function CriminalCheck(props: AdminProps): JSX.Element {
    const router = useRouter();
    const { id: userId } = router.query;
    const {
        user,
        isLoading: userIsLoading,
        error: userError,
    } = useUser(userId as string);

    if (userIsLoading) {
        return <Loading />;
    }
    if (user) {
        const volunteerData = user?.volunteer as Volunteer;
        const volunteerName = user.firstName + " " + user.lastName;
        return (
            <Wrapper session={props.session}>
                <VStack spacing="40px" width="full">
                    <HStack
                        display="flex"
                        justifyContent="space-between"
                        width="full"
                        borderBottomWidth={2}
                        borderBottomColor={colourTheme.colors.CatskillWhite}
                        marginTop="40px"
                        paddingBottom="20px"
                        paddingRight="50px"
                    >
                        <Text
                            fontSize="22px"
                            fontWeight={700}
                            marginLeft="40px"
                            color={colourTheme.colors.Blue}
                        >
                            Registrants
                        </Text>
                        <Button
                            backgroundColor="white"
                            borderColor="black"
                            borderWidth="2px"
                        >
                            Add New Registrant
                        </Button>
                    </HStack>
                    <HStack width="full" spacing="18px">
                        <Link marginLeft="40px">Browse Registrants</Link>
                        <Text> {">"} </Text>
                        <Link>volunteerName</Link>
                        <Text> {">"} </Text>
                        <Link fontWeight="bold"> Criminal Record Check </Link>
                    </HStack>
                    <HStack
                        width="full"
                        display="flex"
                        marginTop="40px"
                        paddingRight="20px"
                        spacing="100px"
                    >
                        <VStack
                            width="400px"
                            spacing="32px"
                            marginLeft="40px"
                            alignSelf="flex-start"
                        >
                            <HStack
                                color={colourTheme.colors.Gray}
                                width="full"
                            >
                                <Icon as={MdPerson} w={8} h={8} />
                                <VStack
                                    alignItems="flex-start"
                                    spacing="-3px"
                                    w="200px"
                                >
                                    <Link>
                                        {"Participant Information" +
                                            " (" +
                                            volunteerName +
                                            ")"}
                                    </Link>
                                </VStack>
                            </HStack>
                            <HStack
                                fontWeight={700}
                                color={colourTheme.colors.Blue}
                                width="full"
                            >
                                <Icon as={MdDescription} w={8} h={8} />
                                <Link>Criminal Record Check</Link>
                            </HStack>
                        </VStack>
                        {volunteerData.criminalRecordCheckLink !== null ? (
                            <FileDownloadCard
                                filePath={FILE_PATH}
                                docName={volunteerData.criminalRecordCheckLink}
                                docApproved={
                                    volunteerData.criminalCheckApproved
                                }
                                participantId={user.id}
                            />
                        ) : (
                            <EmptyState height="200px">
                                The participant has not uploaded a criminal
                                record check at this time.
                            </EmptyState>
                        )}
                    </HStack>
                </VStack>
            </Wrapper>
        );
    }
    return <Loading />;
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
            ...(await serverSideTranslations(context.locale, ["content"])),
        },
    };
};
