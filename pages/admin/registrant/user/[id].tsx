import React from "react";
import Wrapper from "@components/AdminWrapper";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import useUser from "@utils/hooks/useUser";
import { FileType } from "@utils/enum/filetype";
import { isAdmin } from "@utils/session/authorization";

import {
    VStack,
    Icon,
    Link,
    Text,
    HStack,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import colourTheme from "@styles/colours";
import { MdPerson, MdDescription } from "react-icons/md";
import FileDownloadCard from "@components/fileDownloadCard";
import { roles, Volunteer } from ".prisma/client";
import { Parent } from ".prisma/client";
import EmptyState from "@components/EmptyState";
import { Session } from "next-auth";
import { AdminLoading } from "@components/AdminLoading";
import { AdminError } from "@components/AdminError";

type AdminProps = {
    session: Session;
};

export default function CriminalCheck(props: AdminProps): JSX.Element {
    const router = useRouter();
    const { id: userId } = router.query;
    const { user, isLoading: userIsLoading, error: userError } = useUser(userId as string);

    if (userIsLoading) {
        return <AdminLoading />;
    } else if (userError) {
        return <AdminError cause="registrants could not be loaded" />;
    }

    const userRole = user.role as string;
    let volunteerData, parentData;
    if (userRole == roles.VOLUNTEER) {
        volunteerData = user?.volunteer as Volunteer;
    } else if (userRole == roles.PARENT) {
        parentData = user?.parent as Parent;
    } else {
        return <AdminError cause="registrant not found" />;
    }
    const userName = user.firstName + " " + user.lastName;

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
                </HStack>
                <Breadcrumb
                    alignSelf="flex-start"
                    display="flex"
                    paddingLeft="40px"
                    separator={<ChevronRightIcon color="gray.500" />}
                >
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Browse Registrants</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">{userName}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#">
                            {userRole === roles.VOLUNTEER ? "Criminal Record" : "Proof Of Income"}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <HStack
                    width="full"
                    display="flex"
                    marginTop="40px"
                    paddingRight="20px"
                    spacing="100px"
                >
                    <VStack width="400px" spacing="32px" marginLeft="40px" alignSelf="flex-start">
                        <HStack color={colourTheme.colors.Gray} width="full">
                            <Icon as={MdPerson} w={8} h={8} />
                            <VStack alignItems="flex-start" spacing="-3px" w="200px">
                                <Link>{"Participant Information" + " (" + userName + ")"}</Link>
                            </VStack>
                        </HStack>
                        <HStack fontWeight={700} color={colourTheme.colors.Blue} width="full">
                            <Icon as={MdDescription} w={8} h={8} />
                            <Link>
                                {" "}
                                {userRole === roles.VOLUNTEER
                                    ? "Criminal Record Check"
                                    : "Proof of Income"}
                            </Link>
                        </HStack>
                    </VStack>
                    {userRole === roles.VOLUNTEER ? (
                        volunteerData.criminalRecordCheckLink !== null ? (
                            <FileDownloadCard
                                filePath={FileType.CRIMINAL_CHECK}
                                docName={volunteerData.criminalRecordCheckLink}
                                docApproved={volunteerData.criminalCheckApproved}
                                participantId={user.id}
                                userEmail={user.email}
                            />
                        ) : (
                            <EmptyState height="200px">
                                The participant has not uploaded a criminal record check at this
                                time.
                            </EmptyState>
                        )
                    ) : parentData.proofOfIncomeLink !== null ? (
                        <FileDownloadCard
                            filePath={FileType.INCOME_PROOF}
                            docName={parentData.proofOfIncomeLink}
                            docApproved={parentData.proofOfIncomeApproved}
                            participantId={user.id}
                            userEmail={user.email}
                        />
                    ) : (
                        <EmptyState height="200px">
                            The participant has not uploaded a criminal record check at this time.
                        </EmptyState>
                    )}
                </HStack>
            </VStack>
        </Wrapper>
    );
}

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
    } else if (!isAdmin(session)) {
        return {
            redirect: {
                destination: "/no-access",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};
