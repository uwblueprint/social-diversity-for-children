import { Button, Box, Center, Text, HStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession, GetSessionOptions, signIn } from "next-auth/client";
import Wrapper from "@components/AdminWrapper";
import isEmail from "validator/lib/isEmail";
import { roles } from "@prisma/client";
import { TextField } from "@components/formFields/TextField";
import colourTheme from "@styles/colours";
import { createAdminUser } from "@utils/createUser";

/**
 * Internal page for admins to add/invite more admins via email
 */
export default function AddAdmin(): JSX.Element {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [valid, setValid] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (firstName && lastName && isEmail(email)) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [firstName, lastName, email]);

    const InviteEmailAsProgramAdmin = async () => {
        const res = await createAdminUser(email, firstName, lastName);
        if (res.ok) {
            signIn("email", {
                email,
                redirect: false,
            });
            toast({
                title: "Program admin invited!",
                description: `Invite has been sent to ${email}.`,
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

    return (
        <Wrapper>
            <Center h="100%">
                <Box width="700px">
                    <Center>
                        <Text fontWeight="700" fontSize="36px">
                            Invite Program Admin
                        </Text>
                    </Center>
                    <Center>
                        <Text fontWeight="400" fontSize="16px" mt="20px">
                            Invite a program admin to access internal platform
                        </Text>
                    </Center>
                    <HStack spacing="24px" style={{ height: "100px" }}>
                        <TextField
                            name="First Name"
                            placeholder="John"
                            value={firstName}
                            setValue={setFirstName}
                        ></TextField>
                        <TextField
                            name="Last Name"
                            placeholder="Doe"
                            value={lastName}
                            setValue={setLastName}
                        ></TextField>
                    </HStack>
                    <br />
                    <TextField
                        name="Email Address"
                        placeholder="info@socialdiversity.org"
                        value={email}
                        setValue={setEmail}
                    ></TextField>
                    <Center mt={12}>
                        <Button
                            disabled={!valid}
                            bg={
                                valid
                                    ? colourTheme.colors.Blue
                                    : colourTheme.colors.DarkGray
                            }
                            color="brand.200"
                            width="100%"
                            fontSize="12px"
                            fontWeight="400"
                            mt="20px"
                            _hover={
                                valid
                                    ? {
                                          bg: "#2C6AAD",
                                      }
                                    : {}
                            }
                            borderRadius="6px"
                            onClick={() => {
                                InviteEmailAsProgramAdmin();
                            }}
                            _active={{}}
                        >
                            Send
                        </Button>
                    </Center>
                    <Center>
                        <Text
                            fontWeight="400"
                            fontSize="14px"
                            mt="70px"
                            color="brand.300"
                        >
                            Invitee will be sent a magic link or they can choose
                            to login with the email on a later date.
                        </Text>
                    </Center>
                </Box>
            </Center>
        </Wrapper>
    );
}

/**
 * getServerSideProps runs before this page is rendered to check to see if a
 * user has already been authenticated.
 */
export const getServerSideProps: GetServerSideProps = async (
    context: GetSessionOptions,
) => {
    // obtain the next auth session
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } else if (![roles.PROGRAM_ADMIN].includes((session as any).role)) {
        return {
            redirect: {
                destination: "/no-access",
                permanent: false,
            },
        };
    }

    // if the user is not authenticated - continue to the page as normal
    return {
        props: {},
    };
};
