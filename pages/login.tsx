import {
    Button,
    Box,
    Center,
    Text,
    Input,
    FormControl,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession, GetSessionOptions, signIn } from "next-auth/client";
import { useState } from "react";

/**
 * This is the page that a user will use to either login or register
 * to the SDC platform
 */
export default function Login(): JSX.Element {
    // hook to hold the user's email
    const [email, setEmail] = useState("");

    // signInWithEmail sends a login request to the user's email
    const signInWithEmail = () => {
        signIn("email", { email });
    };

    return (
        <Center h="500px">
            <Box width="700px">
                <Center>
                    <Text fontWeight="700" fontSize="32px">
                        Sign Up Or Sign In
                    </Text>
                </Center>
                <Center>
                    <Text fontWeight="400" fontSize="18px" mt="20px">
                        Registration for Summer 2021 classes begin June 31, 2021
                    </Text>
                </Center>
                <FormControl id="email">
                    <Center>
                        <Input
                            width="366px"
                            type="email"
                            placeholder="Email address"
                            mt="40px"
                            onChange={(e) => setEmail(e.target.value)}
                            onEnter={signInWithEmail}
                        />
                    </Center>
                </FormControl>
                <Center>
                    <Button
                        backgroundColor="brand.100"
                        color="brand.200"
                        width="366px"
                        fontSize="10px"
                        fontWeight="400"
                        mt="20px"
                        onClick={signInWithEmail}
                    >
                        Continue
                    </Button>
                </Center>
                <Center>
                    <Text
                        fontWeight="400"
                        fontSize="14px"
                        mt="20px"
                        color="brand.300"
                    >
                        We'll email you a magic code to sign in without a
                        password
                    </Text>
                </Center>
            </Box>
        </Center>
    );
}

/**
 * getServerSideProps runs before this page is rendered to check to see if a
 * user has already been authenticated.
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    // if the user is already authenticated redirect them to the home page
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    // if the user is not authenticated - continue to the page as normal
    return {
        props: {},
    };
};
