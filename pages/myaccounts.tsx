import Wrapper from "@components/SDCWrapper";
import { useEffect, useState } from "react";
import {
    MdPersonOutline,
    MdAccountCircle,
    MdArticle,
    MdLogout,
} from "react-icons/md";
import { Spacer, Box, Icon, Button, Text } from "@chakra-ui/react";
import { Loading } from "@components/Loading";
import useMe from "@utils/useMe";
import { ParticipantInfo } from "@components/myAccounts/ParticipantInformation";
import { VolunteerInfo } from "@components/myAccounts/PersonalVolunteer";
import { GuardianInfo } from "@components/myAccounts/GuardianInformation";
import { IncomePage } from "@components/parent-form/IncomePage";
import { roles, UserInput } from "@models/User";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/client";
import colourTheme from "@styles/colours";

type MyAccountProps = {
    session: Record<string, unknown>;
};

type ApiUserInput = Pick<UserInput, Exclude<keyof UserInput, "id">>;

/**
 * This is the page that a user will use to edit their account information
 */
export default function MyAccount({ session }: MyAccountProps): JSX.Element {
    // Redirect user if user already signed up
    const { me, isLoading } = useMe();

    const [sideBarPage, setSideBarPage] = useState(0);
    const [editing, setEditing] = useState(false);

    const [sideBar, setSideBar] = useState([]);

    const saveParticipant = (participant) => {
        //Update the me object with the new partipcant data.
        //Particpant to update can be found by sideBarPage
        //(If there are 3 children SideBarPage 0-2 represents the index in the student array)
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
        const updatedUserData = await response.json();
        return updatedUserData;
    }

    const PROOF_OF_INCOME_EXAMPLES = ["Income tax notice", "Paystub", "etc"];

    const UPLOADING_PROOF_OF_INCOME = [
        `Navigate to My Account > Proof of Income`,
        `Upload a copy of the result to your SDC account`,
        `Once you’ve submitted your proof of income, keep an eye out for approval status from SDC!`,
        `Upon approval, discounts will automatically applied to your account!
    Check your account for details on the amount of discount you have been approved for`,
    ];

    //The page will be rendered differently based on if the user is a parent or volunteer

    console.log(editing);

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
                    icon: MdAccountCircle,
                    type: "PARTICIPANT",
                    title: "Personal Information",
                    header: "General Information",
                    canEdit: true,
                    component: (
                        <ParticipantInfo
                            key={student.id}
                            props={{
                                student: student,
                                save: saveParticipant,
                                edit: editing,
                            }}
                        />
                    ),
                };
                SideBar.push(option);
            });
            SideBar.push({
                name: "",
                icon: MdPersonOutline,
                title: "Guardian Information",
                header: "Guardian Information",
                canEdit: true,
                component: (
                    <GuardianInfo
                        props={{
                            me: me,
                            save: saveGuardian,
                            edit: editing,
                        }}
                    />
                ),
            });
            SideBar.push({
                name: "",
                icon: MdArticle,
                title: "Proof of Income",
                header: "Proof of Income",
                canEdit: false,
                component: (
                    <IncomePage
                        UPLOADING_PROOF_OF_INCOME={UPLOADING_PROOF_OF_INCOME}
                        PROOF_OF_INCOME_EXAMPLES={PROOF_OF_INCOME_EXAMPLES}
                    />
                ),
            });
        } else {
            SideBar.push({
                name: "",
                icon: MdPersonOutline,
                title: "Participant Information",
                header: "Personal Information",
                canEdit: true,
                component: (
                    <VolunteerInfo
                        props={{
                            me: me,
                            save: saveVolunteer,
                            edit: editing,
                        }}
                    />
                ),
            });
            SideBar.push({
                name: "",
                icon: MdArticle,
                title: "Criminal Record Check",
                header: "Criminal Record Check",
                canEdit: false,
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
                                console.log(sideBarPage);
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
                        <Box style={{ display: "flex", alignItems: "center" }}>
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
