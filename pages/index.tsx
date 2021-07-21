import {
    useSession,
    signIn,
    signOut,
    getSession,
    GetSessionOptions,
} from "next-auth/client";

export default function Component() {
    const [session, loading] = useSession();
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
}

/**
 * getServerSideProps runs before each page is rendered to check to see if a
 * user has already been authenticated
 */
export async function getServerSideProps(context: GetSessionOptions) {
    // obtain the next auth session
    const session = await getSession(context);

    // if the user is not authenticated redirect them to the login page
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    // if the user is authenticated - continue to the page as normal
    return {
        props: {},
    };
}
