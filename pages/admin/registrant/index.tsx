import {
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
import { AdminError } from "@components/AdminError";
import Wrapper from "@components/AdminWrapper";
import useParentsTableData from "@utils/hooks/useParentsTableData";
import useStudentsTableData from "@utils/hooks/useStudentsTableData";
import useUsers from "@utils/hooks/useUsers";
import useVolunteersTableData from "@utils/hooks/useVolunteersTableData";
import { isInternal } from "@utils/session/authorization";
import { Session } from "next-auth";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AdminHeader } from "@components/admin/AdminHeader";

type RegistrantViewProps = {
    session: Session;
};

/**
 * Admin registrant view page that displays all the registrants in the platform
 * @returns Admin class view page component
 */
export default function RegistrantView(props: RegistrantViewProps): JSX.Element {
    const {
        parents,
        students,
        volunteers,
        isLoading: isUsersLoading,
        error: usersError,
    } = useUsers();

    const { studentColumns, studentData } = useStudentsTableData(students);
    const { volunteerColumns, volunteerData } = useVolunteersTableData(volunteers);
    const { parentColumns, parentData } = useParentsTableData(parents);

    if (usersError) {
        return <AdminError cause="registrants could not be loaded" />;
    }

    return (
        <Wrapper session={props.session}>
            <AdminHeader>Registrants</AdminHeader>
            <VStack mx={8} spacing={8} alignItems="flex-start">
                <Breadcrumb separator={">"}>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="/admin/registrant">Browse Registrants</BreadcrumbLink>
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
    } else if (!isInternal(session)) {
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
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
};
