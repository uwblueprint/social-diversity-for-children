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
import { AdminBadge } from "@components/AdminBadge";
import Wrapper from "@components/AdminWrapper";
import { Loading } from "@components/Loading";
import { SDCBadge } from "@components/SDCBadge";
import { locale, roles } from "@prisma/client";
import convertToAge from "@utils/convertToAge";
import useClass from "@utils/hooks/useClass";
import useClassRegistrant from "@utils/hooks/useClassRegistrants";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
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

    const { studentColumns, studentData } = useStudentTableData(studentRegs);
    const volunteerColumns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "fullName",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "City",
                accessor: "cityProvince",
            },
            {
                Header: "Age",
                isNumeric: true,
                accessor: "age",
            },
            {
                Header: "Background Check",
                accessor: "criminalCheckApproved",
            },
        ],
        [],
    );
    const volunteerData = React.useMemo(
        () =>
            volunteerRegs?.map((reg) => {
                return {
                    fullName: `${reg.volunteer.user.firstName} ${reg.volunteer.user.lastName}`,
                    email: reg.volunteer.user.email,
                    cityProvince: `${reg.volunteer.cityName}, ${reg.volunteer.province}`,
                    age: convertToAge(new Date(reg.volunteer.dateOfBirth)),
                    criminalCheckApproved: reg.volunteer
                        .criminalCheckApproved ? (
                        <SDCBadge>Complete</SDCBadge>
                    ) : (
                        <AdminBadge>Incomplete</AdminBadge>
                    ),
                };
            }),
        [volunteerRegs],
    );

    if (isClassLoading) {
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
                            <AdminTable
                                className={classCard.name}
                                dataColumns={studentColumns}
                                tableData={studentData}
                                isRegistrantLoading={isRegistrantLoading}
                            />
                        </TabPanel>
                        <TabPanel>
                            <AdminTable
                                className={classCard.name}
                                dataColumns={volunteerColumns}
                                tableData={volunteerData}
                                isRegistrantLoading={isRegistrantLoading}
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
function useStudentTableData(studentRegs) {
    const studentColumns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "fullName",
            },
            {
                Header: "Emergency Contact",
                accessor: "emergFullName",
            },
            {
                Header: "Phone Number",
                accessor: "emergNumber",
            },
            {
                Header: "Grade",
                accessor: "grade",
                isNumeric: true,
            },
            {
                Header: "City",
                accessor: "cityProvince",
            },
        ],
        [],
    );
    const studentData = React.useMemo(
        () =>
            studentRegs?.map((reg) => {
                return {
                    fullName: `${reg.student.firstName} ${reg.student.lastName}`,
                    emergFullName: `${reg.student.emergFirstName} ${reg.student.emergLastName}`,
                    emergNumber: reg.student.emergNumber,
                    grade: reg.student.grade,
                    cityProvince: `${reg.student.cityName}, ${reg.student.province}`,
                };
            }),
        [studentRegs],
    );
    return { studentColumns, studentData };
}
