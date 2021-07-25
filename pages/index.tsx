import Wrapper from "@components/SDCWrapper";
import { WelcomeToSDC } from "@components/WelcomeToSDC";
import { ProgramList } from "@components/ProgramList";
import { Box, Flex, Divider, Spacer, Heading } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/client";
export default function Component(): JSX.Element {
    const [session, loading] = useSession();

    return (
        <Wrapper session={session}>
            <Flex direction="column" px={48} pt={4} pb={8}>
                <Box>
                    <WelcomeToSDC />
                </Box>
                <Spacer />

                <Divider
                    orientation="horizontal"
                    marginTop="5%"
                    marginBottom="5%"
                />
                <Heading fontSize="3xl" marginBottom="5%">
                    Browse programs
                </Heading>

                <Box>
                    <ProgramList />
                </Box>
            </Flex>
        </Wrapper>
    );
}

/**
 * getServerSideProps runs before each page is rendered to check to see if a
 * user has already been authenticated
 */
// Eric Feng:I don't think we should check for authentication here as this can be accessed without being authenticated. Clicking anything on this
// page will redirect to log in if not authenticated though.
// export const getServerSideProps: GetServerSideProps = async (context) => {
//     // obtain the next auth session
//     const session = await getSession(context);

//     // if the user is not authenticated redirect them to the login page
//     if (!session) {
//         return {
//             redirect: {
//                 destination: "/login",
//                 permanent: false,
//             },
//         };
//     }

//     // if the user is authenticated - continue to the page as normal
//     return {
//         props: {},
//     };
// };
