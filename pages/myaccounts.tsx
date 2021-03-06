import Wrapper from "@components/SDCWrapper";
import { useEffect, useState } from "react";
import { MdLogout, MdPerson, MdSupervisorAccount, MdDescription } from "react-icons/md";
import { Spacer, Box, Icon, Button, Flex, Text } from "@chakra-ui/react";
import { Loading } from "@components/Loading";
import useMe from "@utils/hooks/useMe";
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
import router from "next/router";
import Link from "next/link";
import { isInternal } from "@utils/session/authorization";
import { CommonLoading } from "@components/CommonLoading";
import { CommonError } from "@components/CommonError";
import { Session } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

type MyAccountProps = {
    session: Session;
};

type ApiUserInput = Pick<UserInput, Exclude<keyof UserInput, "id">>;

/**
 * This is the page that a user will use to edit their account information
 */
export default function MyAccount({ session }: MyAccountProps): JSX.Element {
    const { t } = useTranslation(["common", "form"]);

    // Redirect user if user already signed up
    const { me, error, isLoading, mutate } = useMe();

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
    // Stop and inform user to fill out information
    if (me && me.role === null) {
        router.push("/signup");
        return <Loading />;
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
                    title: t("account.participantInformation"),
                    header: t("account.participantInformation"),
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
                title: t("account.guardianInformation"),
                header: t("account.guardianInformation"),
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
                title: t("poi.title", { ns: "form" }),
                header: t("poi.title", { ns: "form" }),
                canEdit: false,
                component: (
                    <ProofOfIncome
                        approved={me.parent.isLowIncome}
                        file={me.parent.proofOfIncomeLink}
                        submitDate={me.parent.proofOfIncomeSubmittedAt}
                    />
                ),
            });
        } else {
            SideBar.push({
                name: "",
                icon: MdPerson,
                title: t("account.personalInformation"),
                header: t("account.personalInformation"),
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
                title: t("bgc.title", { ns: "form" }),
                header: t("bgc.title", { ns: "form" }),
                canEdit: false,
                component: (
                    <CriminalCheck
                        approved={me.volunteer.criminalCheckApproved}
                        file={me.volunteer.criminalRecordCheckLink}
                        submitDate={me.volunteer.criminalCheckSubmittedAt}
                    />
                ),
            });
            //volunteer
        }
        setSideBar(SideBar);
    }, [me, editing]);

    //Wait for the user to load
    if (error) {
        return <CommonError session={session} cause="could not load user" />;
    } else if (isLoading) {
        return <CommonLoading session={session} />;
    }

    return (
        <Wrapper session={session}>
            <Flex marginBottom={50} direction={{ base: "column", lg: "row" }}>
                <Box
                    mb={{ base: 6, lg: 50 }}
                    mr={{ base: 0, lg: 12 }}
                    w={{ base: "100%", lg: 312 }}
                >
                    <Text fontWeight={700} fontSize={36}>
                        {t("nav.myAccount")}
                    </Text>
                    {me && me.role === "PARENT" ? (
                        <Link href="/parent/participant">
                            <Button
                                mt={8}
                                backgroundColor="#0C53A0"
                                borderColor="brand.400"
                                width="85%"
                                height="54px"
                                fontSize="16px"
                                fontWeight="400"
                                color="white"
                                border="1px"
                            >
                                {t("account.addParticipant")}
                            </Button>
                        </Link>
                    ) : null}
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
                        <Button
                            variant="link"
                            mt={{ base: 6, lg: 40 }}
                            onClick={() => signOut()}
                            color={colourTheme.colors.Gray}
                            _hover={{ color: colourTheme.colors.Blue }}
                        >
                            <Icon as={MdLogout} w={8} h={8} />
                            {t("account.logOut")}
                        </Button>
                    </Flex>
                </Box>
                <Box>
                    <Box
                        minW={{ base: 400, lg: 600 }}
                        p={{ base: 0, lg: 12 }}
                        mt={{ base: 6, lg: "80px" }}
                        mb={{ base: 16 }}
                        borderWidth={{ base: "0", lg: "1px" }}
                        borderColor="#C1C1C1"
                    >
                        <Box style={{ display: "flex", alignItems: "center" }} pb={8}>
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
                                        ? t("account.cancel")
                                        : t("account.edit")
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
    }
    if (isInternal(session)) {
        return {
            redirect: {
                destination: "/admin",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
            ...(await serverSideTranslations(context.locale, ["common", "form"])),
        },
    };
};
