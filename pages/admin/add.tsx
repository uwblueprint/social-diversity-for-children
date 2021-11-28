import {
    Box,
    BoxProps,
    Button,
    HStack,
    List,
    ListIcon,
    ListItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useToast,
} from "@chakra-ui/react";
import Wrapper from "@components/AdminWrapper";
import { TextField } from "@components/formFields/TextField";
import colourTheme from "@styles/colours";
import { createAdminUser, createTeacherUser } from "@utils/createUser";
import { isAdmin } from "@utils/session/authorization";
import { GetServerSideProps } from "next"; // Get server side props
import { Session } from "next-auth";
import { getSession, signIn } from "next-auth/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import isEmail from "validator/lib/isEmail";

type AddInternalUserProps = {
    session: Session;
};

/**
 * Internal page for admins to add/invite teachers via email
 */
export default function AddInternalUser(props: AddInternalUserProps): JSX.Element {
    const [teacherFirstName, setTeacherFirstName] = useState("");
    const [teacherLastName, setTeacherLastName] = useState("");
    const [teacherEmail, setTeacherEmail] = useState("");
    const [teacherValid, setTeacherValid] = useState(false);
    const [adminFirstName, setAdminFirstName] = useState("");
    const [adminLastName, setAdminLastName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminValid, setAdminValid] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (teacherFirstName && teacherLastName && isEmail(teacherEmail)) {
            setTeacherValid(true);
        } else {
            setTeacherValid(false);
        }
    }, [teacherFirstName, teacherLastName, teacherEmail]);
    useEffect(() => {
        if (adminFirstName && adminLastName && isEmail(adminEmail)) {
            setAdminValid(true);
        } else {
            setAdminValid(false);
        }
    }, [adminFirstName, adminLastName, adminEmail]);

    const InviteEmailForTeacher = async () => {
        const res = await createTeacherUser(
            teacherEmail,
            teacherFirstName,
            teacherLastName,
        );
        if (res.ok) {
            signIn("email", {
                email: teacherEmail,
                redirect: false,
            });
            toast({
                title: "Teacher invited!",
                description: `Invite has been sent to ${teacherEmail}.`,
                status: "info",
                duration: 9000,
                isClosable: true,
                position: "top-right",
                variant: "left-accent",
            });
        } else {
            toast({
                title: "Teacher invitation failed.",
                description: "Cannot invite existing users.",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top-right",
                variant: "left-accent",
            });
        }
    };
    const InviteEmailForAdmin = async () => {
        const res = await createAdminUser(adminEmail, adminFirstName, adminLastName);
        if (res.ok) {
            signIn("email", {
                email: adminEmail,
                redirect: false,
            });
            toast({
                title: "Program admin invited!",
                description: `Invite has been sent to ${adminEmail}.`,
                status: "info",
                duration: 9000,
                isClosable: true,
                position: "top-right",
                variant: "left-accent",
            });
        } else {
            toast({
                title: "Program admin invitation failed.",
                description: "Cannot invite existing users.",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top-right",
                variant: "left-accent",
            });
        }
    };

    const teacherPermissionLabel =
        "Invite a teacher to access internal platform with the following permissions:";
    const teacherPermissions = [
        "View main dashboard",
        "View programs and classes",
        "View class registrants",
    ];
    const adminPermissionLabel =
        "Invite a program admin to access internal platform with the following permissions:";
    const adminPermissions = [
        "View main dashboard",
        "View, create, edit, or archive programs and classes",
        "View class registrants",
        "View or edit user info",
        "Approval of criminal checks",
        "Approval of proof of income for low income",
    ];

    return (
        <Wrapper session={props.session}>
            <Tabs mx={8} mt={8}>
                <TabList>
                    <Tab>Admin</Tab>
                    <Tab>Teacher</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <InviteForm
                            email={adminEmail}
                            setEmail={setAdminEmail}
                            firstName={adminFirstName}
                            setFirstName={setAdminFirstName}
                            lastName={adminLastName}
                            setLastName={setAdminLastName}
                            onInvite={InviteEmailForAdmin}
                            permissionLabel={adminPermissionLabel}
                            permissions={adminPermissions}
                            valid={adminValid}
                        />
                    </TabPanel>
                    <TabPanel>
                        <InviteForm
                            email={teacherEmail}
                            setEmail={setTeacherEmail}
                            firstName={teacherFirstName}
                            setFirstName={setTeacherFirstName}
                            lastName={teacherLastName}
                            setLastName={setTeacherLastName}
                            onInvite={InviteEmailForTeacher}
                            permissionLabel={teacherPermissionLabel}
                            permissions={teacherPermissions}
                            valid={teacherValid}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Wrapper>
    );
}

type InviteFormProps = BoxProps & {
    permissionLabel: string;
    permissions: string[];
    onInvite: () => Promise<void>;
    firstName: string;
    setFirstName: Dispatch<SetStateAction<string>>;
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    valid: boolean;
};

/**
 * @param {InviteFormProps} props for the invite form for adding internal users
 * @returns a component the invite form and description of permissions of user being added
 */
const InviteForm = ({
    permissionLabel,
    permissions,
    onInvite,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    valid,
}: InviteFormProps): JSX.Element => {
    return (
        <Box>
            <Box pb={8}>
                <Text fontWeight="400" mt="20px" fontSize="lg">
                    {permissionLabel}
                </Text>
                <List pl={4}>
                    {permissions.map((perm, idx) => {
                        return (
                            <ListItem key={idx}>
                                <ListIcon
                                    as={MdCheckCircle}
                                    fontSize="lg"
                                    color={colourTheme.colors.Blue}
                                />
                                {perm}
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
            <HStack spacing="24px" mb={14}>
                <TextField
                    name="First Name"
                    placeholder="John"
                    value={firstName}
                    setValue={setFirstName}
                />
                <TextField
                    name="Last Name"
                    placeholder="Doe"
                    value={lastName}
                    setValue={setLastName}
                />
            </HStack>
            <TextField
                name="Email Address"
                placeholder="info@socialdiversity.org"
                value={email}
                setValue={setEmail}
            />
            <Box position="absolute" bottom={12}>
                <Button
                    disabled={!valid}
                    bg={
                        valid ? colourTheme.colors.Blue : colourTheme.colors.DarkGray
                    }
                    color="brand.200"
                    px={16}
                    fontSize="12px"
                    fontWeight="400"
                    mt="20px"
                    _hover={
                        valid
                            ? {
                                  bg: colourTheme.colors.LightBlue,
                              }
                            : {}
                    }
                    borderRadius="6px"
                    onClick={onInvite}
                    _active={{}}
                >
                    Invite
                </Button>
                <Text fontWeight="400" fontSize="14px" mt={6} color="brand.300">
                    Invitee will be sent a magic link or they can choose to login
                    with the email on a later date.
                </Text>
            </Box>
        </Box>
    );
};

/**
 * getServerSideProps runs before this page is rendered to check to see if a
 * user has already been authenticated.
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

    // if the user is not authenticated - continue to the page as normal
    return {
        props: {
            session,
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
};
