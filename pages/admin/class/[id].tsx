import { SearchIcon } from "@chakra-ui/icons";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Flex,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
} from "@chakra-ui/react";
import { ClassViewInfoCard } from "@components/admin/ClassViewInfoCard";
import Wrapper from "@components/AdminWrapper";
import { Loading } from "@components/Loading";
import { locale, roles } from "@prisma/client";
import useUpcomingClasses from "@utils/hooks/useUpcomingClasses";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";

type ClassViewProps = {
    session: Record<string, unknown>;
};

/**
 * Admin dasboard page that displays the platform stats, live classes, and upcoming classes
 * @returns Admin dashboard page component
 */
export default function ClassView(props: ClassViewProps): JSX.Element {
    // We want a hook that grabs the current class data
    const { upcomingClasses, isLoading: isUpcomingLoading } =
        useUpcomingClasses(locale.en);
    const classCard = upcomingClasses[0];

    if (isUpcomingLoading) {
        return <Loading />;
    }

    return (
        <Wrapper session={props.session}>
            <VStack mx={8} spacing={8} mt={10} alignItems="flex-start">
                <Breadcrumb separator={">"}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/program">
                            Browse Programs
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        {/* TODO: Change ID to program ID */}
                        <BreadcrumbLink href={`/admin/program/${classCard.id}`}>
                            {classCard.programName}
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#" fontWeight="bold">
                            {classCard.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <ClassViewInfoCard cardInfo={classCard} />
                <Tabs w="100%">
                    <TabList>
                        <Tab>
                            {classCard.spaceTaken} Student
                            {classCard.spaceTaken != 1 ? "s" : ""}
                        </Tab>
                        <Tab>
                            {classCard.volunteerSpaceTaken} Volunteer
                            {classCard.volunteerSpaceTaken != 1 ? "s" : ""}
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Flex>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={
                                            <Icon
                                                as={SearchIcon}
                                                color="gray.300"
                                            />
                                        }
                                    />
                                    <Input
                                        type="programs"
                                        placeholder="Search SDC Programs"
                                    />
                                </InputGroup>
                                <Button>Export Classlist</Button>
                            </Flex>
                            <p>one!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
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
    } else if (
        ![roles.PROGRAM_ADMIN, roles.TEACHER].includes((session as any).role)
    ) {
        return {
            redirect: {
                destination: "/no-access",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
