import { WelcomeToSDC } from "@components/WelcomeToSDC";
import { useSession, signIn, signOut } from "next-auth/client";
import { ProgramList } from "../src/components/ProgramList";
import { Box, Flex, Divider, Spacer, Heading } from "@chakra-ui/react";

export default function Component() {
    // const [session, loading] = useSession();
    // if (session) {
    //     return (
    //         <>
    //             Signed in as {session.user.email} <br />
    //             <button onClick={() => signOut()}>Sign out</button>
    //         </>
    //     );
    // }
    return (
        <>
            <Flex direction="column" margin="10% 15%">
                <Box>
                    <WelcomeToSDC />
                </Box>
                <Spacer />

                <Divider
                    orientation="horizontal"
                    marginTop="5%"
                    marginBottom="5%"
                />
                <Heading fontSize="xl" marginBottom="5%">
                    Browse programs
                </Heading>

                <Box>
                    <ProgramList />
                </Box>
            </Flex>
        </>
    );
}
