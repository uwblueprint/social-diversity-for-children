import Wrapper from "@components/SDCWrapper";
import { useEffect, useState } from "react";
import {
    MdLogout,
    MdPerson,
    MdSupervisorAccount,
    MdDescription,
} from "react-icons/md";
import { Spacer, Box, Icon, Button, Text } from "@chakra-ui/react";
import { Loading } from "@components/Loading";
import useMe from "@utils/useMe";
import { ParticipantInfo } from "@components/myAccounts/ParticipantInformation";
import { VolunteerInfo } from "@components/myAccounts/PersonalVolunteer";
import { GuardianInfo } from "@components/myAccounts/GuardianInformation";
import { ProofOfIncome } from "@components/myAccounts/ProofOfIncome";
import { roles, UserInput } from "@models/User";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/client";
import colourTheme from "@styles/colours";
import { UpdateStudentInput } from "@models/Student";
import { CriminalCheck } from "@components/myAccounts/CriminalCheck";

type MyAccountProps = {
    session: Record<string, unknown>;
};

type ApiUserInput = Pick<UserInput, Exclude<keyof UserInput, "id">>;

/**
 * This is the page that a user will use to edit their account information
 */
export default function MyAccount({ session }: MyAccountProps): JSX.Element {
    // Redirect user if user already signed up
    const { me, isLoading, mutate } = useMe();

    const [sideBarPage, setSideBarPage] = useState(0);
    const [editing, setEditing] = useState(false);

    const [sideBar, setSideBar] = useState([]);

    const saveParticipant = (participant) => {
        const studentData = participant as UpdateStudentInput;
        studentData.parentId = me.id;
        updateStudent(studentData);
    };
    const saveGuardian = (parent) => {
        const parentData = me.parent;
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
        const response = await fetch("/api/user", request);
        mutate();
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
        mutate();
        const updatedStudentData = await response.json();
        return updatedStudentData;
    }

    //The page will be rendered differently based on if the user is a parent or volunteer
    useEffect(() => {
        if (!me || isLoading) {
            return;
        }
        //Generate the side bar
        const SideBar = [];
        if (me.role === "PARENT") {
            me.parent.students.forEach((student) => {
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
                icon: MdSupervisorAccount,
                title: "Guardian Information",
                header: "Guardian Information",
                canEdit: true,
                component: (
                    <GuardianInfo
                        props={{
                            me: me,
                            save: (parent) => {
                                saveGuardian(parent);
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
                title: "Proof of Income",
                header: "Proof of Income",
                canEdit: false,
                component: (
                    <ProofOfIncome
                        approved={me.parent.isLowIncome}
                        link={me.parent.proofOfIncomeLink}
                        // TODO: Add submit date columns to table rows
                        submitDate={new Date()}
                    />
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
                            me: me,
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
                component: (
                    <CriminalCheck
                        // TODO: Integrate is approved column, it is in PR #107
                        approved={
                            me.volunteer.criminalRecordCheckLink ? true : false
                        }
                        link={me.volunteer.criminalRecordCheckLink}
                        // TODO: Add submit date columns to table rows
                        submitDate={new Date()}
                    />
                ),
            });
            //volunteer
        }
        setSideBar(SideBar);
    }, [me, editing]);

    //Wait for the user to load
    if (isLoading) {
        return <Loading />;
    }

    return (
        <Wrapper session={session}>
            <Box display="flex" marginBottom={50}>
                <Box style={{ width: 312, marginBottom: 50 }}>
                    <Text fontWeight={700} fontSize={36}>
                        {"My Account"}
                    </Text>
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
                    <br />
                    <Button
                        variant="link"
                        mt={40}
                        onClick={() => signOut()}
                        color={colourTheme.colors.Gray}
                        _hover={{ color: colourTheme.colors.Blue }}
                    >
                        <Icon as={MdLogout} w={8} h={8} />
                        Log out
                    </Button>
                </Box>
                <Box>
                    <Box
                        style={{
                            width: 600,
                            marginTop: 87,
                            padding: 48,
                        }}
                        borderWidth="1px"
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
            </Box>
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
    }

    return {
        props: {
            session,
        },
    };
};
