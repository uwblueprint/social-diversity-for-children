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
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import useUsers from "@utils/hooks/useUsers";
import { useAdminsTableData } from "@utils/hooks/useAdminsTableData";
import { isAdmin } from "@utils/session/authorization";

type UserViewProps = {
    session: Record<string, unknown>;
};

// TODO: make the following fields either dash or N/A
// Students
// Grade -
// postal,city,school N/A
// Volunteers
// city,postal
// Volunteer add pending state?
// parents
// better phone format?
// For teacher, we can show # classes they are in

/**
 * Admin registrant view page that displays all the registrants in the platform
 * @returns Admin class view page component
 */
export default function UserView(props: UserViewProps): JSX.Element {
    const {
        programAdmins,
        teachers,
        isLoading: isUsersLoading,
        error: usersError,
    } = useUsers();

    const { adminColumns, adminData } = useAdminsTableData(programAdmins);

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
                            Browse Internal Users
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Tabs w="100%">
                    <TabList>
                        <Tab>Admins</Tab>
                        <Tab>Teachers</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <AdminTable
                                exportName="Admins"
                                exportItem="Admins"
                                dataColumns={adminColumns}
                                tableData={adminData}
                                isLoading={isUsersLoading}
                                filterPlaceholder="Search Admins"
                                hiddenColumns={["id"]}
                            />
                        </TabPanel>
                        <TabPanel></TabPanel>
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
    } else if (!isAdmin(session)) {
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
