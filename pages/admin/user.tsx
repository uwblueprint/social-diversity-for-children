import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { AdminTable } from "@components/admin/table/AdminTable";
import Wrapper from "@components/AdminWrapper";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React, { useState } from "react";
import useUsers from "@utils/hooks/useUsers";
import useAdminsTableData from "@utils/hooks/useAdminsTableData";
import { isAdmin } from "@utils/session/authorization";
import useTeachersTableData from "@utils/hooks/useTeachersTableData";
import { deleteUser } from "@utils/deleteUser";
import { Session } from "next-auth";
import { AdminError } from "@components/AdminError";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type UserViewProps = {
    session: Session;
};

/**
 * Admin registrant view page that displays all the registrants in the platform
 * @returns Admin class view page component
 */
export default function UserView(props: UserViewProps): JSX.Element {
    const [revokeName, setRevokeName] = useState("");
    const [revokeUserId, setRevokeUserId] = useState(-1);

    const {
        programAdmins,
        teachers,
        isLoading: isUsersLoading,
        error: usersError,
    } = useUsers();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const { adminColumns, adminData } = useAdminsTableData(
        programAdmins,
        onOpen,
        setRevokeName,
        setRevokeUserId,
        props.session.id,
    );
    const { teacherColumns, teacherData } = useTeachersTableData(
        teachers,
        onOpen,
        setRevokeName,
        setRevokeUserId,
        props.session.id,
    );
    const toast = useToast();

    if (usersError) {
        return <AdminError cause="users could not be loaded" />;
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
                        <TabPanel>
                            <AdminTable
                                exportName="Teachers"
                                exportItem="Teachers"
                                dataColumns={teacherColumns}
                                tableData={teacherData}
                                isLoading={isUsersLoading}
                                filterPlaceholder="Search Teachers"
                                hiddenColumns={["id"]}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete User {revokeName}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={async () => {
                                    const res = await deleteUser(
                                        revokeUserId,
                                    ).finally(onClose);
                                    if (res.ok) {
                                        toast({
                                            title: "Internal user has been revoked.",
                                            description: `User ${revokeName} has been deleted.`,
                                            status: "info",
                                            duration: 9000,
                                            isClosable: true,
                                            position: "top-right",
                                            variant: "left-accent",
                                        });
                                    } else {
                                        toast({
                                            title: "Internal user cannot be revoked.",
                                            description: `User ${revokeName} is currently in use.`,
                                            status: "error",
                                            duration: 9000,
                                            isClosable: true,
                                            position: "top-right",
                                            variant: "left-accent",
                                        });
                                    }
                                }}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
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
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
};
