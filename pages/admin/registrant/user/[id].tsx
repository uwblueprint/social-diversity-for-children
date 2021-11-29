import { roles } from ".prisma/client";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Flex,
    Icon,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { AdminHeader } from "@components/admin/AdminHeader";
import { AdminError } from "@components/AdminError";
import { AdminLoading } from "@components/AdminLoading";
import Wrapper from "@components/AdminWrapper";
import EmptyState from "@components/EmptyState";
import FileDownloadCard from "@components/fileDownloadCard";
import { GuardianInfo } from "@components/myAccounts/GuardianInformation";
import { ParticipantInfo } from "@components/myAccounts/ParticipantInformation";
import { VolunteerInfo } from "@components/myAccounts/PersonalVolunteer";
import { UpdateStudentInput } from "@models/Student";
import { UserInput } from "@models/User";
import colourTheme from "@styles/colours";
import { FileType } from "@utils/enum/filetype";
import useUser from "@utils/hooks/useUser";
import { isAdmin } from "@utils/session/authorization";
import { GetServerSideProps } from "next"; // Get server side props
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdDescription, MdPerson, MdSupervisorAccount } from "react-icons/md";
import { mutate } from "swr";

type AdminProps = {
    session: Session;
};

type ApiUserInput = Pick<UserInput, Exclude<keyof UserInput, "id">>;

export default function Registrant(props: AdminProps): JSX.Element {
    const router = useRouter();
    const { id: userId } = router.query;
    const { user, isLoading, error } = useUser(userId as string);

    const [sideBarPage, setSideBarPage] = useState(0);
    const [editing, setEditing] = useState(false);

    const [sideBar, setSideBar] = useState([]);

    const saveParticipant = (participant) => {
        const studentData = participant as UpdateStudentInput;
        studentData.parentId = user.id;
        updateStudent(studentData);
    };
    const saveGuardian = (parent) => {
        const parentData = user.parent;
        parentData.phoneNumber = parent.phoneNumber;
        const userData: ApiUserInput = {
            firstName: parent.firstName,
            lastName: parent.lastName,
            role: roles.PARENT,
            roleData: parentData,
        };
        updateUser(userData);
    };

    const saveVolunteer = (volunteer) => {
        const { firstName, lastName, ...roleData } = volunteer;
        const userData: ApiUserInput = {
            firstName,
            lastName,
            role: roles.VOLUNTEER,
            roleData,
        };
        updateUser(userData);
    };

    async function updateUser(userData) {
        const request = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        };
        const response = await fetch(
            `/api/user?id=${userId as string}`,
            request,
        );
        mutate(`/api/user/${userId as string}`);
        const updatedUserData = await response.json();
        return updatedUserData;
    }
    async function updateStudent(userData) {
        const request = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        };
        const response = await fetch("/api/student", request);
        mutate(`/api/user/${userId as string}`);
        const updatedStudentData = await response.json();
        return updatedStudentData;
    }

    //The page will be rendered differently based on if the user is a parent or volunteer
    useEffect(() => {
        if (!user || isLoading) {
            return;
        }
        //Generate the side bar
        const SideBar = [];
        if (user.role === "PARENT") {
            SideBar.push({
                name: "",
                icon: MdSupervisorAccount,
                title: "Guardian Information",
                header: "Guardian Information",
                canEdit: true,
                component: (
                    <GuardianInfo
                        props={{
                            me: user,
                            save: (parent) => {
                                saveGuardian(parent);
                                setEditing(false);
                            },
                            edit: editing,
                        }}
                    />
                ),
            });
            user.parent.students.forEach((student) => {
                const option = {
                    name: student.firstName + " " + student.lastName,
                    icon: MdPerson,
                    type: "PARTICIPANT",
                    title: "Personal Information",
                    header: "General Information",
                    canEdit: true,
                    component: (
                        <ParticipantInfo
                            key={student.id}
                            props={{
                                student: student,
                                save: (participant) => {
                                    saveParticipant(participant);
                                    setEditing(false);
                                },
                                edit: editing,
                            }}
                        />
                    ),
                };
                SideBar.push(option);
            });
            SideBar.push({
                name: "",
                icon: MdDescription,
                title: "Proof of Income",
                header: "Proof of Income",
                canEdit: false,
                component:
                    user.parent.proofOfIncomeLink !== null ? (
                        <FileDownloadCard
                            filePath={FileType.INCOME_PROOF}
                            docName={user.parent.proofOfIncomeLink}
                            docApproved={user.parent.isLowIncome}
                            participantId={user.id}
                            userEmail={user.email}
                        />
                    ) : (
                        <EmptyState height="200px">
                            The participant has not uploaded a criminal record
                            check at this time.
                        </EmptyState>
                    ),
            });
        } else {
            SideBar.push({
                name: "",
                icon: MdPerson,
                title: "Participant Information",
                header: "Personal Information",
                canEdit: true,
                component: (
                    <VolunteerInfo
                        props={{
                            me: user,
                            save: (volunteer) => {
                                saveVolunteer(volunteer);
                                setEditing(false);
                            },
                            edit: editing,
                        }}
                    />
                ),
            });
            SideBar.push({
                name: "",
                icon: MdDescription,
                title: "Criminal Record Check",
                header: "Criminal Record Check",
                canEdit: false,
                component:
                    user.volunteer.criminalRecordCheckLink !== null ? (
                        <FileDownloadCard
                            filePath={FileType.CRIMINAL_CHECK}
                            docName={user.volunteer.criminalRecordCheckLink}
                            docApproved={user.volunteer.criminalCheckApproved}
                            participantId={user.id}
                            userEmail={user.email}
                        />
                    ) : (
                        <EmptyState height="200px">
                            The participant has not uploaded a criminal record
                            check at this time.
                        </EmptyState>
                    ),
            });
        }
        setSideBar(SideBar);
    }, [user, editing]);

    if (error) {
        return <AdminError cause="registrants could not be loaded" />;
    } else if (isLoading) {
        return <AdminLoading />;
    }

    return (
        <Wrapper session={props.session}>
            <AdminHeader>Registrant</AdminHeader>
            <Breadcrumb
                alignSelf="flex-start"
                display="flex"
                paddingLeft="40px"
                separator={">"}
            >
                <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/registrant">
                        Browse Registrants
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        href="#"
                        fontWeight="bold"
                        isCurrentPage
                    >{`${user.firstName} ${user.lastName}`}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex direction={{ base: "column", lg: "row" }} mx={8}>
                <Box mr={{ base: 0, lg: 2 }} minW={{ base: "100%", lg: 300 }}>
                    {/* // TODO: Add an optional participant button */}
                    <Flex direction="column" align="flex-start">
                        {sideBar.map((option, i) => (
                            <Button
                                key={i}
                                variant="link"
                                mt={6}
                                onClick={() => {
                                    setSideBarPage(i);
                                }}
                                color={
                                    sideBarPage === i
                                        ? colourTheme.colors.Blue
                                        : colourTheme.colors.Gray
                                }
                                _hover={{ color: colourTheme.colors.Blue }}
                            >
                                <Icon as={option.icon} w={8} h={8} />
                                <Text align="left" pl={4}>
                                    {option.title} <br />
                                    {option.name ? "(" + option.name + ")" : ""}
                                </Text>
                            </Button>
                        ))}
                    </Flex>
                </Box>
                <Box>
                    <Box
                        minW={{ base: 400, lg: 600 }}
                        p={{ base: 0, lg: 12 }}
                        mt={6}
                        borderWidth={{ base: "0", lg: "1px" }}
                        borderColor="#C1C1C1"
                    >
                        <Box
                            style={{ display: "flex", alignItems: "center" }}
                            pb={8}
                        >
                            {" "}
                            <Text fontWeight={700} fontSize={24}>
                                {sideBar[sideBarPage]?.header}
                            </Text>
                            <Spacer />
                            <Button
                                variant="link"
                                onClick={() => setEditing(!editing)}
                                color={colourTheme.colors.Blue}
                            >
                                {sideBar[sideBarPage]?.canEdit
                                    ? editing
                                        ? "Cancel"
                                        : "Edit"
                                    : undefined}
                            </Button>
                        </Box>
                        {sideBar[sideBarPage]?.component}
                    </Box>
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
            ...(await serverSideTranslations(context.locale, [
                "common",
                "form",
            ])),
        },
    };
};
