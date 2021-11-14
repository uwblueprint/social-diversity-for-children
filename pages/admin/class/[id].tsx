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
import { ClassViewInfoCard } from "@components/admin/ClassViewInfoCard";
import { AdminTable } from "@components/admin/table/AdminTable";
import Wrapper from "@components/AdminWrapper";
import { Loading } from "@components/Loading";
import { locale } from "@prisma/client";
import useClass from "@utils/hooks/useClass";
import useClassRegistrant from "@utils/hooks/useClassRegistrants";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import useVolunteerRegTableData from "../../../utils/hooks/useVolunteerRegTableData";
import useStudentRegTableData from "../../../utils/hooks/useStudentRegTableData";
import React from "react";
import { isInternal } from "@utils/session/authorization";

type ClassViewProps = {
    session: Record<string, unknown>;
};

/**
 * Admin class view page that displays the information about the class given a class id
 * @returns Admin class view page component
 */
export default function ClassView(props: ClassViewProps): JSX.Element {
    const router = useRouter();
    const { id } = router.query;

    const {
        classCard,
        isLoading: isClassLoading,
        error: classError,
    } = useClass(id as string, locale.en);
    const {
        studentRegs,
        volunteerRegs,
        isLoading: isRegistrantLoading,
        error: registrantError,
    } = useClassRegistrant(parseInt(id as string, 10));

    const { studentColumns, studentData } = useStudentRegTableData(studentRegs);
    const { volunteerColumns, volunteerData } =
        useVolunteerRegTableData(volunteerRegs);

    if (isClassLoading) {
        return <Loading />;
    } else if (classError || registrantError) {
        return (
            <Box>
                {"An error has occurred. Class/registrants could not be loaded"}
            </Box>
        );
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
                        <BreadcrumbLink
                            href={`/admin/program/${classCard.programId}`}
                        >
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
                            {classCard.spaceTaken !== 1 ? "s" : ""}
                        </Tab>
                        <Tab>
                            {classCard.volunteerSpaceTaken} Volunteer
                            {classCard.volunteerSpaceTaken !== 1 ? "s" : ""}
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <AdminTable
                                exportName={`Students - ${classCard.name}`}
                                exportItem="Classlist"
                                dataColumns={studentColumns}
                                tableData={studentData}
                                isLoading={isRegistrantLoading}
                                filterPlaceholder="Search students"
                                hiddenColumns={["parentId"]}
                            />
                        </TabPanel>
                        <TabPanel>
                            <AdminTable
                                exportName={`Volunteers - ${classCard.name}`}
                                exportItem="Classlist"
                                dataColumns={volunteerColumns}
                                tableData={volunteerData}
                                isLoading={isRegistrantLoading}
                                filterPlaceholder="Search volunteers"
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
        props: {},
    };
};
