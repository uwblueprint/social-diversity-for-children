import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
} from "@chakra-ui/react";
import { AdminTable } from "@components/admin/table/AdminTable";
import Wrapper from "@components/AdminWrapper";
import { Loading } from "@components/Loading";
import { roles } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import useUsers from "@utils/hooks/useUsers";
import { useVolunteersTableData } from "@utils/hooks/useVolunteersTableData";
import { useStudentsTableData } from "@utils/hooks/useStudentsTableData";
import { useParentsTableData } from "@utils/hooks/useParentsTableData";

type RegistrantViewProps = {
    session: Record<string, unknown>;
};

/**
 * Admin registrant view page that displays all the registrants in the platform
 * @returns Admin class view page component
 */
export default function RegistrantView(
    props: RegistrantViewProps,
): JSX.Element {
    const {
        parents,
        students,
        volunteers,
        isLoading: isUsersLoading,
        error: usersError,
    } = useUsers();

    const { studentColumns, studentData } = useStudentsTableData(students);
    const { volunteerColumns, volunteerData } =
        useVolunteersTableData(volunteers);
    const { parentColumns, parentData } = useParentsTableData(parents);

    if (isUsersLoading) {
        return <Loading />;
    } else if (usersError) {
        return (
            <Box>
                {"An error has occurred. Registrants could not be loaded"}
            </Box>
        );
    }

    return (
        <Wrapper session={props.session}>
            <VStack mx={8} spacing={8} mt={10} alignItems="flex-start">
                <Breadcrumb separator={">"}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/registrant">
                            Browse Registrants
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Tabs w="100%">
                    <TabList>
                        <Tab>Guardians</Tab>
                        <Tab>Students</Tab>
                        <Tab>Volunteers</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <AdminTable
                                exportName="Guardians"
                                exportItem="Registrants"
                                dataColumns={parentColumns}
                                tableData={parentData}
                                isLoading={isUsersLoading}
                                filterPlaceholder="Search Parents"
                                hiddenColumns={["id"]}
                            />
                        </TabPanel>
                        <TabPanel>
                            <AdminTable
                                exportName="Students"
                                exportItem="Registrants"
                                dataColumns={studentColumns}
                                tableData={studentData}
                                isLoading={isUsersLoading}
                                filterPlaceholder="Search Students"
                                hiddenColumns={["parentId"]}
                            />
                        </TabPanel>
                        <TabPanel>
                            <AdminTable
                                exportName="Volunteers"
                                exportItem="Registrants"
                                dataColumns={volunteerColumns}
                                tableData={volunteerData}
                                isLoading={isUsersLoading}
                                filterPlaceholder="Search Volunteers"
                                hiddenColumns={["id"]}
                            />
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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