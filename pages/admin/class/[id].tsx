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
import { ClassViewInfoCard } from "@components/admin/ClassViewInfoCard";
import { AdminTable } from "@components/admin/table/AdminTable";
import Wrapper from "@components/AdminWrapper";
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
import { AdminError } from "@components/AdminError";
import { AdminLoading } from "@components/AdminLoading";
import { Session } from "next-auth";

type ClassViewProps = {
    session: Session;
};

/**
 * Admin class view page that displays the information about the class given a class id
 * @returns Admin class view page component
 */
export default function ClassView({ session }: ClassViewProps): JSX.Element {
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
    const { volunteerColumns, volunteerData } = useVolunteerRegTableData(volunteerRegs);

    if (classError || registrantError) {
        return <AdminError cause="class could not be loaded" />;
    }
    if (isClassLoading || isRegistrantLoading) {
        return <AdminLoading />;
    }

    return (
        <Wrapper session={session}>
            <VStack mx={8} spacing={8} mt={10} alignItems="flex-start">
                <Breadcrumb separator={">"}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/program">Browse Programs</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/admin/program/${classCard.programId}`}>
                            {classCard.programName}
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#" fontWeight="bold">
                            {classCard.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <ClassViewInfoCard cardInfo={classCard} role={session.role} />
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
        props: { session },
    };
};
